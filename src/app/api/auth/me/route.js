// src/app/api/auth/me/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, user: null }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // { id, role, name }
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, user: null }, { status: 401 });
  }
}