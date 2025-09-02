// src/app/api/admin/list/route.js
export const runtime = 'nodejs';
import { getDb } from '../../../../../lib/db';

export async function GET() {
  try {
    const db = getDb();
    // Do NOT return password
    const [rows] = await db.query(
      `SELECT id, username, email, level, created_at, updated_at
       FROM admins
       ORDER BY created_at DESC`
    );

    return new Response(JSON.stringify({ ok: true, admins: rows }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('ADMIN LIST ERROR:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}