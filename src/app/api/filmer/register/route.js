// src/app/api/filmer/register/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '../../../../../lib/db';

/**
 * POST /api/filmer/register
 * Body JSON:
 * {
 *   first_name, last_name, email, dateofbirth (YYYY-MM-DD),
 *   password, phone?, profile_image_path?, company?, portfolio_url?, bio?
 * }
 */
export async function POST(request) {
  try {
    const db = await getDb();
    const body = await request.json();

    // ---- Basic validation ----
    const required = ['first_name', 'last_name', 'email', 'dateofbirth', 'password'];
    const missing = required.filter((k) => !body?.[k] || String(body[k]).trim() === '');
    if (missing.length) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const first_name = String(body.first_name).trim();
    const last_name = String(body.last_name).trim();
    const email = String(body.email).trim().toLowerCase();
    const dateofbirth = String(body.dateofbirth).trim(); // Expecting YYYY-MM-DD
    const password = String(body.password);

    // Quick checks
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateofbirth)) {
      return NextResponse.json(
        { success: false, message: 'dateofbirth must be YYYY-MM-DD' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Optional fields (nullable)
    const phone = body.phone ? String(body.phone).trim() : null;
    const profile_image_path = body.profile_image_path ? String(body.profile_image_path).trim() : null;
    const company = body.company ? String(body.company).trim() : null;
    const portfolio_url = body.portfolio_url ? String(body.portfolio_url).trim() : null;
    const bio = body.bio ? String(body.bio).trim() : null;

    // ---- Hash password ----
    const password_hash = await bcrypt.hash(password, 10);

    // ---- Insert ----
    const sql = `
      INSERT INTO filmer_user
        (first_name, last_name, email, dateofbirth, password_hash,
         phone, profile_image_path, company, portfolio_url, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      first_name,
      last_name,
      email,
      dateofbirth,    // MySQL DATE accepts 'YYYY-MM-DD'
      password_hash,
      phone || null,
      profile_image_path || null,
      company || null,
      portfolio_url || null,
      bio || null,
    ];

    const [result] = await db.execute(sql, params);

    // Build safe response (never return hash)
    return NextResponse.json(
      {
        success: true,
        data: {
          id: result.insertId,
          first_name,
          last_name,
          email,
          dateofbirth,
          phone,
          profile_image_path,
          company,
          portfolio_url,
          bio,
          status: 'active',
        },
        message: 'Registration successful',
      },
      { status: 201 }
    );
  } catch (err) {
    // Handle MySQL duplicate key errors (email/phone)
    // ER_DUP_ENTRY (1062) example message includes the key name
    const message = String(err?.message || '');
    if (err?.code === 'ER_DUP_ENTRY' || message.includes('Duplicate entry')) {
      if (message.includes('uq_filmers_email')) {
        return NextResponse.json(
          { success: false, message: 'Email is already registered' },
          { status: 409 }
        );
      }
      if (message.includes('uq_filmers_phone')) {
        return NextResponse.json(
          { success: false, message: 'Phone is already registered' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, message: 'Duplicate value for a unique field' },
        { status: 409 }
      );
    }

    console.error('Register error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
