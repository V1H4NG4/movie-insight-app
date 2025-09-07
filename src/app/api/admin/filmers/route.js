// src/app/api/admin/filmers/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db';

// Only allow real columns from your schema
const ALLOWED_SORT = new Set(['created_at', 'first_name', 'last_name', 'email', 'status']);
const ALLOWED_ORDER = new Set(['asc', 'desc']);

export async function GET(request) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);

    const page  = Math.max(parseInt(searchParams.get('page')  || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '10', 10), 1), 100);
    const q     = (searchParams.get('q') || '').trim();

    const sortRaw  = (searchParams.get('sort')  || '').trim();
    const orderRaw = (searchParams.get('order') || '').trim().toLowerCase();

    const sort  = ALLOWED_SORT.has(sortRaw) ? sortRaw : 'created_at';
    const order = ALLOWED_ORDER.has(orderRaw) ? orderRaw : 'desc';

    const whereParts = [];
    const params = [];

    if (q) {
      // search by first_name, last_name, email
      whereParts.push('(first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)');
      const like = `%${q}%`;
      params.push(like, like, like);
    }

    const whereSQL = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    // Count
    const [countRows] = await db.execute(
      `SELECT COUNT(*) AS total FROM filmer_user ${whereSQL}`,
      params
    );
    const total = countRows?.[0]?.total ?? 0;

    // Data
    const offset = (page - 1) * limit;

    // Build SQL with LIMIT/OFFSET inlined (safe — we clamp to ints above)
    const dataSql = `
    SELECT
        id,
        first_name,
        last_name,
        email,
        dateofbirth,
        phone,
        company,
        portfolio_url,
        status,
        created_at,
        updated_at
    FROM filmer_user
    ${whereSQL}
    ORDER BY ${sort} ${order.toUpperCase()}
    LIMIT ${limit} OFFSET ${offset}
    `;

    // Use params only for WHERE (...) LIKE ? markers
    const [rows] = await db.execute(dataSql, params);

    const data = rows.map(r => ({
      id: r.id,
      firstName: r.first_name,
      lastName:  r.last_name,
      email:     r.email,
      dateOfBirth: r.dateofbirth,
      phone:     r.phone,
      company:   r.company,
      portfolioUrl: r.portfolio_url,
      status:    r.status,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)),
        sort, order, q
      },
    });
  } catch (err) {
    // Surface error details in dev so you can see exactly what's wrong
    console.error('GET /api/admin/filmers error:', err);
    const devDetail = process.env.NODE_ENV !== 'production'
      ? { code: err?.code, sqlMessage: err?.sqlMessage, message: err?.message }
      : {};
    return NextResponse.json(
      { success: false, message: 'Internal server error', ...devDetail },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const db = await getDb();
    const body = await request.json();

    const id = Number(body?.id);
    const status = String(body?.status || '').trim();

    if (!id || !['active', 'suspended'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'id and status (active|suspended) are required' },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `UPDATE filmer_user SET status=?, updated_at=NOW() WHERE id=?`,
      [status, id]
    );

    if (!result.affectedRows) {
      return NextResponse.json({ success: false, message: 'Filmer not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (err) {
    console.error('PATCH /api/admin/filmers error:', err);
    const devDetail = process.env.NODE_ENV !== 'production'
      ? { code: err?.code, sqlMessage: err?.sqlMessage, message: err?.message }
      : {};
    return NextResponse.json(
      { success: false, message: 'Internal server error', ...devDetail },
      { status: 500 }
    );
  }
}
