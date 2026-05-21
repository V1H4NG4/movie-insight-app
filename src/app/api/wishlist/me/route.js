// src/app/api/wishlist/me/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getDb } from '../../../../../lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return NextResponse.json({ success: false, wishlist: null }, { status: 401 });

    let user;
    try { user = jwt.verify(token, process.env.JWT_SECRET); } catch {
      return NextResponse.json({ success: false, wishlist: null }, { status: 401 });
    }

    const db = await getDb();
    const [rows] = await db.query(
      'SELECT id, movie_1,movie_2,movie_3,movie_4,movie_5,movie_6,movie_7,movie_8,movie_9,movie_10 FROM wishlists WHERE geek_id = ? LIMIT 1',
      [user.id]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ success: true, wishlist: null }, { status: 200 });
    }

    return NextResponse.json({ success: true, wishlist: rows[0] }, { status: 200 });
  } catch (e) {
    console.error('Wishlist fetch error:', e);
    return NextResponse.json({ success: false, wishlist: null }, { status: 500 });
  }
}
