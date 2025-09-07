import { NextResponse } from 'next/server';

/**
 * GET /api/tmdb/genres
 * Returns cached MOVIE genres only.
 */
let cache = { genres: null, at: 0 };

export async function GET() {
  try {
    if (!process.env.TMDB_API_KEY) {
      return NextResponse.json({ error: 'TMDB_API_KEY not configured' }, { status: 500 });
    }
    const now = Date.now();
    if (cache.genres && (now - cache.at) < 6 * 60 * 60 * 1000) {
      return NextResponse.json({ genres: cache.genres }, { status: 200 });
    }

    const url = new URL('https://api.themoviedb.org/3/genre/movie/list');
    url.searchParams.set('api_key', process.env.TMDB_API_KEY);
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return NextResponse.json({ error: 'Genre fetch failed' }, { status: 502 });
    const json = await res.json();
    cache.genres = json.genres || [];
    cache.at = now;
    return NextResponse.json({ genres: cache.genres }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
