// src/app/api/tmdb/find/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMG_BASE  = 'https://image.tmdb.org/t/p/w342';

// Detect v4 token (JWT-like, starts with "eyJ")
const looksLikeV4 = (s) => typeof s === 'string' && s.startsWith('eyJ');

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get('query') || '').trim();
    const page  = Math.max(1, Math.min(500, Number(searchParams.get('page') || 1)));

    if (!query) {
      return NextResponse.json({ results: [], page: 1, total_pages: 0, total_results: 0 }, { status: 200 });
    }

    // Support any of these env names
    const ENV_V4  = process.env.TMDB_V4_TOKEN;
    const ENV_V3  = process.env.TMDB_V3_KEY;
    const ENV_ANY = process.env.TMDB_API_KEY;

    // Decide which one to use
    const v4Token = ENV_V4 || (looksLikeV4(ENV_ANY) ? ENV_ANY : null);
    const v3Key   = ENV_V3 || (!looksLikeV4(ENV_ANY) ? ENV_ANY : null);

    if (!v4Token && !v3Key) {
      return NextResponse.json({ error: 'TMDB API credentials not configured' }, { status: 500 });
    }

    const url = new URL(`${TMDB_BASE}/search/movie`);
    url.searchParams.set('query', query);
    url.searchParams.set('page', String(page));
    url.searchParams.set('include_adult', 'false');
    url.searchParams.set('language', 'en-US');

    const headers = { accept: 'application/json' };

    if (v4Token) {
      // v4 access token via Authorization header
      headers.Authorization = `Bearer ${v4Token}`;
    } else {
      // v3 key via query string
      url.searchParams.set('api_key', v3Key);
    }

    const res = await fetch(url.toString(), { headers, cache: 'no-store' });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return NextResponse.json({ error: `TMDB error ${res.status}: ${body}` }, { status: 502 });
    }

    const data = await res.json();
    const results = (data.results || []).map((m) => ({
      id: m.id,
      title: m.title || m.original_title || 'Untitled',
      overview: m.overview || '',
      release_date: m.release_date || null,
      year: m.release_date ? String(m.release_date).slice(0, 4) : null,
      poster_path: m.poster_path || '',
      posterUrl: m.poster_path ? `${IMG_BASE}${m.poster_path}` : '',
      vote_average: m.vote_average ?? null,
      popularity: m.popularity ?? null,
    }));

    return NextResponse.json({
      results,
      page: data.page || 1,
      total_pages: data.total_pages || 0,
      total_results: data.total_results || 0,
    });
  } catch (err) {
    console.error('tmdb/find error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
