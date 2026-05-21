// src/app/api/wishlist/add/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getDb } from '../../../../../lib/db';

const COLS = [
  'movie_1','movie_2','movie_3','movie_4','movie_5',
  'movie_6','movie_7','movie_8','movie_9','movie_10'
];

export async function POST(req) {
  try {
    // auth via cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET); // { id, role, name }
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    // Only geeks get this wishlist for now (optional guard)
    if (user.role !== 'geek') {
      return NextResponse.json({ success: false, message: 'Wishlist available for geek users only.' }, { status: 403 });
    }

    const { movieId } = await req.json() || {};
    const movie_id = Number(movieId);
    if (!movie_id || Number.isNaN(movie_id)) {
      return NextResponse.json({ success: false, message: 'Invalid movie id.' }, { status: 400 });
    }

    const db = await getDb();

    // 1) Check for existing wishlist
    const [rows] = await db.query(
      `SELECT id, ${COLS.join(', ')} FROM wishlists WHERE geek_id = ? LIMIT 1`,
      [user.id]
    );

    // 2) If none, create new with movie_1
    if (!Array.isArray(rows) || rows.length === 0) {
      const placeholders = ['?'].concat(Array(COLS.length).fill('NULL')).join(', ');
      // But we want movie_1 to be set—so build explicit insert
      const [res] = await db.query(
        `INSERT INTO wishlists (geek_id, ${COLS.join(', ')})
         VALUES (?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`,
        [user.id, movie_id]
      );
      return NextResponse.json({
        success: true,
        action: 'created',
        position: 1,
        wishlist_id: res?.insertId
      }, { status: 201 });
    }

    // 3) Row exists: prevent duplicates + fill first NULL
    const wl = rows[0];

    // duplicate?
    for (const c of COLS) {
      if (wl[c] != null && Number(wl[c]) === movie_id) {
        return NextResponse.json({
          success: true,
          action: 'exists',
          message: 'Movie already in wishlist.'
        }, { status: 200 });
      }
    }

    // find first NULL
    const idx = COLS.findIndex(c => wl[c] == null);
    if (idx === -1) {
      return NextResponse.json({
        success: false,
        message: 'Wishlist is full (10 movies).'
      }, { status: 409 });
    }

    const col = COLS[idx];
    const sql = `UPDATE wishlists SET ${col} = ? WHERE id = ?`;
    await db.query(sql, [movie_id, wl.id]);

    return NextResponse.json({
      success: true,
      action: 'added',
      position: idx + 1
    }, { status: 200 });

  } catch (err) {
    console.error('Wishlist add error:', err);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
