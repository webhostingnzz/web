import { notFound } from 'next/navigation';
import { getPublicResult } from '../../../lib/speedtest/store';
import ResultPageClient from './ResultPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = await getPublicResult(id).catch(() => null);
  if (!r) return { title: 'Result not found | NZ Website Speed Test' };
  const done = r.status === 'done';
  const title = done
    ? `${r.host} scored Grade ${r.grade} on the NZ Website Speed Test`
    : `Speed test for ${r.host} | NZ Website Speed Test`;
  const description = done
    ? `${r.host}: mobile ${r.mobile?.score}/100, desktop ${r.desktop?.score}/100${r.hosting?.country && !r.hosting.cdn ? `, hosted in ${r.hosting.country}` : ''}. Test your own site free at Webhosting NZ.`
    : 'Free website speed test for New Zealand sites by Webhosting NZ.';
  return {
    title,
    description,
    // Individual results are for sharing; the tool page is what should rank.
    robots: { index: false, follow: true },
    alternates: { canonical: `/speed-test/r/${r.id}/` },
    openGraph: { title, description, type: 'website', url: `/speed-test/r/${r.id}/` },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function SpeedTestResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = await getPublicResult(id).catch(() => null);
  if (!r) notFound();
  return <ResultPageClient initial={r} />;
}
