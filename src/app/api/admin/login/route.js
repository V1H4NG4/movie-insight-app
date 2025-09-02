// src/app/api/admin/login/route.js
export const runtime = 'nodejs';
import { getDb } from '../../../../../lib/db';

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();
    if (!identifier || !password) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing credentials' }), { status: 400 });
    }

    const db = getDb();

    // IMPORTANT: parameter order must match the placeholders
    const [rows] = await db.execute(
      `SELECT id, username, email, level
       FROM admins
       WHERE (username = ? OR email = ?)
         AND password = SHA2(?, 256)
       LIMIT 1`,
      [identifier, identifier, password]
    );

    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid username/email or password' }), { status: 401 });
    }

    const admin = rows[0];
    return new Response(
      JSON.stringify({
        ok: true,
        admin: { id: admin.id, username: admin.username, email: admin.email, level: admin.level }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), { status: 500 });
  }
}