import { NextResponse } from 'next/server';
import { getPublicResult } from '../../../lib/speedtest/store';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const result = await getPublicResult(id);
    if (!result) return NextResponse.json({ error: 'Result not found.' }, { status: 404 });
    return NextResponse.json(result, { headers: { 'cache-control': 'no-store' } });
  } catch (e) {
    console.error('Speed test fetch error:', e);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
