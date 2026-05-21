// src/app/api/geek/register/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db';
import bcrypt from 'bcryptjs';

const NAME_RE = /^[A-Za-z]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function dobCutoffDate() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 15);
  d.setHours(0, 0, 0, 0);
  return d;
}

function validatePayload(payload) {
  const errors = {};
  const {
    firstname,
    lastname,
    email,
    dateofbirth,      // "YYYY-MM-DD"
    phone,            // optional
    profile_image_path, // optional
    password,
    confirmPassword,  // optional client-provided
  } = payload ?? {};

  if (!firstname || typeof firstname !== 'string' || !NAME_RE.test(firstname)) {
    errors.firstname = 'First name must contain A–Z only.';
  }
  if (!lastname || typeof lastname !== 'string' || !NAME_RE.test(lastname)) {
    errors.lastname = 'Last name must contain A–Z only.';
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    errors.email = 'A valid email is required.';
  }

  let dob = null;
  if (!dateofbirth || typeof dateofbirth !== 'string') {
    errors.dateofbirth = 'Date of birth is required (YYYY-MM-DD).';
  } else {
    const t = new Date(dateofbirth);
    if (Number.isNaN(t.getTime())) {
      errors.dateofbirth = 'Invalid date format.';
    } else {
      dob = t;
      dob.setHours(0, 0, 0, 0);
      if (dob > dobCutoffDate()) {
        errors.dateofbirth = 'You must be at least 15 years old.';
      }
    }
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  if (confirmPassword != null && password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  const ok = Object.keys(errors).length === 0;
  return {
    ok,
    errors,
    data: ok
      ? {
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          email: email.trim().toLowerCase(),
          dateofbirth: dob?.toISOString().slice(0, 10),
          phone: phone && typeof phone === 'string' ? phone.trim() : null,
          profile_image_path:
            profile_image_path && typeof profile_image_path === 'string'
              ? profile_image_path.trim()
              : null,
          password,
        }
      : null,
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { ok, errors, data } = validatePayload(body);
    if (!ok) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const db = await getDb();

    // Ensure email unique
    const [rows] = await db.query(
      'SELECT id FROM geek_user WHERE email = ? LIMIT 1',
      [data.email]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email is already registered.' },
        { status: 409 }
      );
    }

    const password_hash = await bcrypt.hash(data.password, 12);

    const [result] = await db.query(
      `INSERT INTO geek_user
       (firstname, lastname, email, dateofbirth, phone, profile_image_path, password_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.firstname,
        data.lastname,
        data.email,
        data.dateofbirth,
        data.phone,
        data.profile_image_path,
        password_hash,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        user: {
          id: result?.insertId,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          dateofbirth: data.dateofbirth,
          phone: data.phone,
          profile_image_path: data.profile_image_path,
          created_at: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Geek register error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error while registering geek user.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}