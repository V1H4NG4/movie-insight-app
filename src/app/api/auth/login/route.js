// src/app/api/auth/login/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // npm install jsonwebtoken

export async function POST(req) {
  try {
    const { email, password } = await req.json() || {};
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
    }

    const db = await getDb();
    const emailNorm = String(email).trim().toLowerCase();

    // check geek_user
    const [geekRows] = await db.query(
      'SELECT id, firstname, lastname, email, password_hash FROM geek_user WHERE email = ? LIMIT 1',
      [emailNorm]
    );
    if (Array.isArray(geekRows) && geekRows.length === 1) {
      const u = geekRows[0];
      const ok = await bcrypt.compare(password, u.password_hash);
      if (!ok) return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });

      return makeLoginResponse({ id: u.id, role: 'geek', name: u.firstname });
    }

    // check filmer_user
    const [filmerRows] = await db.query(
      `SELECT id, first_name, last_name, email, password_hash, status
       FROM filmer_user WHERE email = ? LIMIT 1`,
      [emailNorm]
    );
    if (Array.isArray(filmerRows) && filmerRows.length === 1) {
      const u = filmerRows[0];
      if (u.status !== 'active') {
        return NextResponse.json({ success: false, message: 'Account is not active.' }, { status: 403 });
      }
      const ok = await bcrypt.compare(password, u.password_hash);
      if (!ok) return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });

      return makeLoginResponse({ id: u.id, role: 'filmer', name: u.first_name });
    }

    return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ success: false, message: 'Server error during login.' }, { status: 500 });
  }
}

// helper
function makeLoginResponse(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

  const res = NextResponse.json({ success: true, role: payload.role, user: payload });
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
