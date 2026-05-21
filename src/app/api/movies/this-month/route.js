export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db'; // follow same depth as /api/movies/list

export async function GET() {
  let conn;
  try {
    const db = await getDb();
    conn = db.getConnection ? await db.getConnection() : db;

    // Sri Lanka timezone so CURDATE() is correct for you
    if (conn.query) {
      await conn.query(`SET time_zone = ?`, ['Asia/Colombo']);
    }

    const sql = `
      SELECT id, title, release_date, release_types, poster_path
      FROM movies
      WHERE release_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND release_date <  DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
      ORDER BY release_date ASC
    `;

    const exec = conn.query ? conn.query.bind(conn) : db.query.bind(db);
    const [rows] = await exec(sql);

    const data = rows.map((r) => ({
      ...r,
      release_types: Array.isArray(r.release_types)
        ? r.release_types
        : (() => { try { return JSON.parse(r.release_types ?? '[]'); } catch { return []; } })(),
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/movies/this-month error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (conn && conn.release) conn.release();
  }
}