import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// WordPress pings this endpoint the instant a post is published or updated,
// so the blog index and that post's page refresh immediately instead of
// waiting for the hourly automatic recheck.
const REVALIDATE_SECRET = 'SH4iz9eIIJ_a4cgFVbEuCFFrib0Uuly0Wv8PFCc-6sc';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = await request.json();
    slug = body?.slug;
  } catch {
    // no body sent — that's fine, we'll still refresh the blog index
  }

  revalidatePath('/blog');
  if (slug) {
    revalidatePath(`/${slug}`);
  }

  return NextResponse.json({ revalidated: true, slug: slug || null, now: Date.now() });
}
