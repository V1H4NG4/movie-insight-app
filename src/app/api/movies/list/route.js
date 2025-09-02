// src/app/api/movies/list/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db'; // same depth as your admin route

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim();
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '24', 10), 1), 60);
    const offset = (page - 1) * limit;

    const db = getDb();

    const params = [];
    let sql = `
      SELECT id, title, release_date, release_types, poster_path, created_at
      FROM movies
    `;

    if (q) {
      sql += ` WHERE title LIKE ? `;
      params.push(`%${q}%`);
    }

    sql += ` ORDER BY release_date DESC, created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await db.query(sql, params);

    // Normalize JSON column
    const items = rows.map((r) => ({
      ...r,
      release_types: (() => {
        try { return Array.isArray(r.release_types) ? r.release_types : JSON.parse(r.release_types || '[]'); }
        catch { return []; }
      })(),
    }));

    return NextResponse.json({ ok: true, items, page, limit }, { status: 200 });
  } catch (err) {
    console.error('MOVIE LIST ERROR:', err);
    return NextResponse.json({ ok: false, error: err.message || 'Failed to list movies' }, { status: 500 });
  }
}
