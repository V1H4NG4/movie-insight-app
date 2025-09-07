import { NextResponse } from 'next/server';

/**
 * GET /api/tmdb/details?id=27205
 * Movie-only details with credits & videos.
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!process.env.TMDB_API_KEY) {
      return NextResponse.json({ error: 'TMDB_API_KEY not configured' }, { status: 500 });
    }
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const base = `https://api.themoviedb.org/3/movie/${id}`;
    const params = new URLSearchParams({ api_key: process.env.TMDB_API_KEY });

    const dRes = await fetch(`${base}?${params.toString()}`, { cache: 'no-store' });
    if (!dRes.ok) return NextResponse.json({ error: 'Details fetch failed' }, { status: 502 });
    const details = await dRes.json();

    const cRes = await fetch(`${base}/credits?${params.toString()}`, { cache: 'no-store' });
    const credits = cRes.ok ? await cRes.json() : {};

    const vRes = await fetch(`${base}/videos?${params.toString()}`, { cache: 'no-store' });
    const videos = vRes.ok ? await vRes.json() : {};

    return NextResponse.json({ details, credits, videos }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
