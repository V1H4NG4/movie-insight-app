import { NextResponse } from 'next/server';

/**
 * GET /api/tmdb/search?q=Inception&page=1&year=2010
 * Movie-only search (no TV). Uses TMDB_API_KEY.
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const page = searchParams.get('page') || '1';
    const year = searchParams.get('year') || '';

    if (!process.env.TMDB_API_KEY) {
      return NextResponse.json({ error: 'TMDB_API_KEY not configured' }, { status: 500 });
    }
    if (!q.trim()) {
      return NextResponse.json({ page: 1, total_pages: 0, total_results: 0, results: [] }, { status: 200 });
    }

    const url = new URL('https://api.themoviedb.org/3/search/movie');
    url.searchParams.set('api_key', process.env.TMDB_API_KEY);
    url.searchParams.set('query', q);
    url.searchParams.set('page', page);
    url.searchParams.set('include_adult', 'false');
    if (year) url.searchParams.set('year', year);

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return NextResponse.json({ error: 'TMDb search failed', detail: text }, { status: 502 });
    }
    const json = await res.json();
    return NextResponse.json(json, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
