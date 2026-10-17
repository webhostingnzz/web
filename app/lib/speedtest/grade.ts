// Grade and rating helpers, shared by the API, result pages and the badge.

// Mobile counts for more: most NZ visitors browse on phones.
export function combinedScore(mobile: number, desktop: number): number {
  return Math.round(mobile * 0.6 + desktop * 0.4);
}

export function gradeFor(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 45) return 'D';
  return 'F';
}

export const GRADE_COLORS: Record<string, string> = {
  A: '#16a34a',
  B: '#65a30d',
  C: '#ca8a04',
  D: '#ea580c',
  F: '#dc2626',
};

export type Rating = 'good' | 'ok' | 'poor';

// Google's Core Web Vitals thresholds.
const THRESHOLDS: Record<string, [number, number]> = {
  lcp: [2500, 4000],
  cls: [0.1, 0.25],
  inp: [200, 500],
  tbt: [200, 600],
  fcp: [1800, 3000],
  ttfb: [800, 1800],
  score: [90, 50],
};

export function rate(metric: keyof typeof THRESHOLDS | string, value: number | null): Rating | null {
  if (value === null || value === undefined) return null;
  const t = THRESHOLDS[metric];
  if (!t) return null;
  if (metric === 'score') return value >= t[0] ? 'good' : value >= t[1] ? 'ok' : 'poor';
  return value <= t[0] ? 'good' : value <= t[1] ? 'ok' : 'poor';
}
