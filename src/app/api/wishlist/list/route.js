// src/app/api/wishlist/list/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getDb } from '../../../../../lib/db';

/**
 * GET /api/wishlist/list
 * - Reads auth_token from cookies, verifies JWT.
 * - Only supports role: 'geek' (since wishlists are per geek_user).
 * - Loads the most recent wishlist row for that geek_id.
 * - Returns up to 10 movie entries.
 * - If a `movies` table exists, enrich with title/poster/year/runtime/tmdbId.
 */
export async function GET() {
  try {
    // 1) Auth from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ items: [], error: 'Unauthorized' }, { status: 401 });
    }

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ items: [], error: 'Invalid token' }, { status: 401 });
    }

    if (!user?.id || user?.role !== 'geek') {
      // Only geeks have a wishlist in this schema
      return NextResponse.json({ items: [], error: 'Forbidden' }, { status: 403 });
    }

    const geekId = Number(user.id);
    if (!Number.isFinite(geekId) || geekId <= 0) {
      return NextResponse.json({ items: [], error: 'Invalid user' }, { status: 400 });
    }

    // 2) DB
    const db = await getDb();

    // 3) Pull the latest wishlist row for this geek
    const [rows] = await db.query(
      `SELECT id, geek_id,
              movie_1, movie_2, movie_3, movie_4, movie_5,
              movie_6, movie_7, movie_8, movie_9, movie_10
         FROM wishlists
        WHERE geek_id = ?
        ORDER BY id DESC
        LIMIT 1`,
      [geekId]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const w = rows[0];
    const ids = [
      w.movie_1, w.movie_2, w.movie_3, w.movie_4, w.movie_5,
      w.movie_6, w.movie_7, w.movie_8, w.movie_9, w.movie_10,
    ].filter((x) => x != null);

    if (ids.length === 0) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    // 4) Enrich from movies table using your schema (title, poster_path, release_date)
    try {
    const placeholders = ids.map(() => '?').join(',');
    const [movieRows] = await db.query(
        `SELECT id, title, poster_path, release_date
        FROM movies
        WHERE id IN (${placeholders})`,
        ids
    );

    const byId = new Map(
        Array.isArray(movieRows) ? movieRows.map((m) => [String(m.id), m]) : []
    );

    // Base for relative posters (set in your .env)
    // Example: NEXT_PUBLIC_POSTER_BASE=https://yourdomain.com
    const SERVER_BASE =
        process.env.POSTER_BASE || process.env.NEXT_PUBLIC_POSTER_BASE || '';

    const toAbsoluteUrl = (p) => {
        if (!p) return '';
        // Already absolute?
        if (/^https?:\/\//i.test(p)) return p;
        if (!SERVER_BASE) return `/${p.replace(/^\/+/, '')}`; // fallback to relative
        return `${SERVER_BASE.replace(/\/+$/, '')}/${p.replace(/^\/+/, '')}`;
    };

    const toYear = (dateStr) =>
        dateStr && dateStr.length >= 4 ? dateStr.slice(0, 4) : null;

    const items = ids.map((id) => {
        const m = byId.get(String(id));
        return m
        ? {
            movieId: m.id,
            title: m.title || `Movie #${m.id}`,
            posterUrl: toAbsoluteUrl(m.poster_path),
            year: toYear(m.release_date),
            runtime: null,
            tmdbId: null,
            }
        : { movieId: id };
    });

    return NextResponse.json({ items }, { status: 200 });
    } catch (e) {
    const items = ids.map((id) => ({ movieId: id }));
    return NextResponse.json({ items }, { status: 200 });
    }

  } catch (err) {
    console.error('wishlist/list error:', err);
    return NextResponse.json({ items: [], error: 'Server error' }, { status: 500 });
  }
}
