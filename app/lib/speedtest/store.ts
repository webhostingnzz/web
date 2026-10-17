import crypto from 'crypto';
import { getSupabaseAdmin } from '../supabase';
import { combinedScore, gradeFor } from './grade';
import { lookupHosting } from './hosting';
import { PageSpeedError, runPageSpeed } from './pagespeed';
import { runNzProbe } from './probe';
import type { PublicResult } from './types';

const TABLE = 'speed_tests';

// Per-visitor limits keep the Google PageSpeed quota (25,000 calls a day,
// two per test) safe. All three can be changed with environment variables.
const LIMIT_HOUR = Number(process.env.SPEED_TEST_LIMIT_HOUR || 5);
const LIMIT_DAY = Number(process.env.SPEED_TEST_LIMIT_DAY || 20);
const DAILY_CAP = Number(process.env.SPEED_TEST_DAILY_CAP || 3000);
// A finished test of the same URL this recent is reused instead of re-run.
const REUSE_MINUTES = 30;
// A test still "running" after this long is treated as failed.
const STALE_MS = 4 * 60 * 1000;

export function newId(): string {
  const alphabet = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.randomBytes(10);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

export function hashIp(ip: string): string {
  const salt = process.env.SPEED_TEST_SALT || process.env.ADMIN_SESSION_SECRET || 'whnz-speed-test';
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

const since = (ms: number) => new Date(Date.now() - ms).toISOString();

export async function findRecent(url: string): Promise<string | null> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from(TABLE)
    .select('id, status, created_at')
    .eq('url', url)
    .in('status', ['running', 'done'])
    .gte('created_at', since(REUSE_MINUTES * 60 * 1000))
    .order('created_at', { ascending: false })
    .limit(1);
  const row = data?.[0];
  if (!row) return null;
  if (row.status === 'running' && Date.now() - new Date(row.created_at).getTime() > STALE_MS) return null;
  return row.id;
}

export async function checkLimits(ipHash: string): Promise<string | null> {
  const db = getSupabaseAdmin();
  const count = async (filter: (q: any) => any) => {
    const { count: c, error } = await filter(db.from(TABLE).select('id', { count: 'exact', head: true }));
    if (error) throw error;
    return c || 0;
  };
  const [hour, day, all] = await Promise.all([
    count((q) => q.eq('ip_hash', ipHash).gte('created_at', since(3600_000))),
    count((q) => q.eq('ip_hash', ipHash).gte('created_at', since(86400_000))),
    count((q) => q.gte('created_at', since(86400_000))),
  ]);
  if (hour >= LIMIT_HOUR) return `You've run ${LIMIT_HOUR} tests in the last hour. Please wait a little and try again.`;
  if (day >= LIMIT_DAY) return `You've reached today's limit of ${LIMIT_DAY} tests. Please come back tomorrow.`;
  if (all >= DAILY_CAP) return 'The speed test has reached its daily limit. Please try again tomorrow.';
  return null;
}

export async function createTest(id: string, url: string, host: string, ipHash: string) {
  const db = getSupabaseAdmin();
  const { error } = await db.from(TABLE).insert({
    id,
    url,
    host,
    ip_hash: ipHash,
    status: 'running',
    nz_domain: /\.nz$/.test(host),
  });
  if (error) throw error;
}

// Runs the whole test and saves the outcome. Called after the HTTP response
// has been sent, so the visitor polls for the result.
export async function runTest(id: string, url: string, ip: string) {
  const db = getSupabaseAdmin();
  const apiKey = process.env.PAGESPEED_API_KEY?.trim() || '';
  try {
    const [mobile, desktop, hosting, nzProbe] = await Promise.all([
      runPageSpeed(url, 'mobile', apiKey),
      runPageSpeed(url, 'desktop', apiKey),
      lookupHosting(url, ip).catch(() => null),
      runNzProbe(url),
    ]);
    const score = combinedScore(mobile.result.score, desktop.result.score);
    const { error } = await db
      .from(TABLE)
      .update({
        status: 'done',
        updated_at: new Date().toISOString(),
        final_url: mobile.finalUrl || desktop.finalUrl,
        score,
        grade: gradeFor(score),
        mobile_score: mobile.result.score,
        desktop_score: desktop.result.score,
        mobile: mobile.result,
        desktop: desktop.result,
        hosting,
        hosted_in_nz: hosting && !hosting.cdn ? hosting.countryCode === 'NZ' : null,
        nz_probe: nzProbe,
      })
      .eq('id', id);
    if (error) throw error;
  } catch (e) {
    const message = e instanceof PageSpeedError ? e.message : 'Something went wrong while testing this site. Please try again.';
    if (!(e instanceof PageSpeedError)) console.error('Speed test failed:', e);
    await db.from(TABLE).update({ status: 'failed', error: message, updated_at: new Date().toISOString() }).eq('id', id);
  }
}

export async function getPublicResult(id: string): Promise<PublicResult | null> {
  if (!/^[A-Za-z0-9]{6,20}$/.test(id)) return null;
  const db = getSupabaseAdmin();
  const { data: row } = await db.from(TABLE).select('*').eq('id', id).maybeSingle();
  if (!row) return null;

  let status = row.status as PublicResult['status'];
  let error = row.error as string | null;
  if (status === 'running' && Date.now() - new Date(row.created_at).getTime() > STALE_MS) {
    status = 'failed';
    error = 'This test timed out. Please run it again.';
    await db.from(TABLE).update({ status, error, updated_at: new Date().toISOString() }).eq('id', id).eq('status', 'running');
  }

  let percentile: PublicResult['percentile'] = null;
  if (status === 'done' && typeof row.score === 'number') {
    const { data } = await db.rpc('speed_test_percentile', { p_score: row.score });
    const p = Array.isArray(data) ? data[0] : data;
    if (p) percentile = { fasterThan: p.faster_than, sites: p.sites };
  }

  return {
    id: row.id,
    status,
    error,
    url: row.url,
    host: row.host,
    finalUrl: row.final_url,
    createdAt: row.created_at,
    grade: row.grade,
    score: row.score,
    mobile: row.mobile,
    desktop: row.desktop,
    hosting: row.hosting,
    hostedInNz: row.hosted_in_nz,
    nzDomain: row.nz_domain,
    nzProbe: row.nz_probe,
    percentile,
  };
}
