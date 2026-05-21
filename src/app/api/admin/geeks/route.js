export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db';

// Allowed columns for sorting (whitelist for safety)
const ALLOWED_SORT = new Set(['created_at', 'updated_at', 'firstname', 'lastname', 'email', 'status']);
const ALLOWED_ORDER = new Set(['asc', 'desc']);

// GET /api/admin/geeks?q=&status=&page=&limit=&sort=&order=
export async function GET(req) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);

    const q = (searchParams.get('q') || '').trim();
    const status = (searchParams.get('status') || '').trim().toLowerCase();

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const offset = (page - 1) * limit;

    const sort = (searchParams.get('sort') || 'created_at').toLowerCase();
    const order = (searchParams.get('order') || 'desc').toLowerCase();
    const sortCol = ALLOWED_SORT.has(sort) ? sort : 'created_at';
    const sortDir = ALLOWED_ORDER.has(order) ? order : 'desc';

    const where = [];
    const args = [];

    if (q) {
      const like = `%${q}%`;
      where.push(`(gu.firstname LIKE ? OR gu.lastname LIKE ? OR gu.email LIKE ? OR gu.phone LIKE ?)`);
      args.push(like, like, like, like);
    }
    if (status === 'active' || status === 'suspend') {
      where.push(`gu.status = ?`);
      args.push(status);
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const [rows] = await db.query(
      `
      SELECT gu.id,
             gu.firstname, gu.lastname, gu.email, gu.phone,
             gu.profile_image_path AS profileImagePath,
             gu.dateofbirth, gu.status, gu.created_at, gu.updated_at
        FROM geek_user gu
        ${whereSql}
       ORDER BY gu.${sortCol} ${sortDir}
       LIMIT ? OFFSET ?
      `,
      [...args, limit, offset]
    );

    const [[countRow]] = await db.query(
      `SELECT COUNT(*) AS total FROM geek_user gu ${whereSql}`,
      args
    );

    return NextResponse.json({
      success: true,
      page,
      limit,
      total: countRow?.total || 0,
      items: rows || [],
    });
  } catch (err) {
    console.error('GET /api/admin/geeks error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// PATCH /api/admin/geeks  { id, status: 'active'|'suspend' }
export async function PATCH(req) {
  try {
    const db = await getDb();
    const { id, status } = await req.json().catch(() => ({}));

    const geekId = Number(id);
    const next = String(status || '').toLowerCase();

    if (!Number.isFinite(geekId) || geekId <= 0) {
      return NextResponse.json({ success: false, message: 'Valid id required' }, { status: 400 });
    }
    if (!['active', 'suspend'].includes(next)) {
      return NextResponse.json({ success: false, message: 'Status must be active or suspend' }, { status: 400 });
    }

    const [res] = await db.query(
      `UPDATE geek_user SET status = ? WHERE id = ?`,
      [next, geekId]
    );

    return NextResponse.json({
      success: true,
      affected: res?.affectedRows || 0,
      id: geekId,
      status: next,
    });
  } catch (err) {
    console.error('PATCH /api/admin/geeks error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
