// src/app/api/movies/new/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import crypto from 'crypto';

// NOTE: Your db helper lives at movie-insight-app/lib/db.js
// This relative path matches src/app/api/**/**/route.js depth (same as your admin route)
import { getDb } from '../../../../../lib/db';

const ALLOWED_TYPES = new Set([
  '2D',
  '3D',
  'IMAX',
  'DOLBY_ATMOS',
  'DOLBY_DIGITAL',
  '4DX',
]);

const ALLOWED_MIME = new Set(['image/png', 'image/jpeg']);
const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB

function toSafeSlug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch {
    /* ignore */
  }
}

export async function POST(req) {
  try {
    const form = await req.formData();

    const title = String(form.get('title') || '').trim();
    const release_date = String(form.get('release_date') || '').trim();
    const typesRaw = form.get('release_types') || '[]';
    const poster = form.get('poster'); // Blob

    if (!title || !release_date || !poster) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields: title, release_date, poster.' },
        { status: 400 }
      );
    }

    // Parse and validate release types
    let release_types = [];
    try {
      const arr = JSON.parse(typesRaw);
      if (Array.isArray(arr)) {
        release_types = arr
          .map(String)
          .filter((t) => ALLOWED_TYPES.has(t));
      }
    } catch {
      release_types = [];
    }

    // Validate poster
    const mime = poster.type;
    if (!ALLOWED_MIME.has(mime)) {
      return NextResponse.json(
        { ok: false, error: 'Poster must be a JPEG or PNG image.' },
        { status: 400 }
      );
    }

    const arrayBuf = await poster.arrayBuffer();
    if (arrayBuf.byteLength > MAX_FILE_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Poster file too large (max 8MB).' },
        { status: 413 }
      );
    }

    // Save to /public/posters
    const postersDir = path.join(process.cwd(), 'public', 'posters');
    await ensureDir(postersDir);

    const ext = mime === 'image/png' ? 'png' : 'jpg';
    const slug = toSafeSlug(title) || 'movie';
    const rand = crypto.randomBytes(6).toString('hex');
    const fileName = `${Date.now()}_${slug}_${rand}.${ext}`;
    const filePath = path.join(postersDir, fileName);

    await writeFile(filePath, Buffer.from(arrayBuf));
    const poster_path = `/posters/${fileName}`;

    // Insert into DB
    const db = getDb();
    const [result] = await db.query(
      `INSERT INTO movies (title, release_date, release_types, poster_path, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [title, release_date, JSON.stringify(release_types), poster_path]
    );

    return NextResponse.json(
      {
        ok: true,
        movie: {
          id: result.insertId,
          title,
          release_date,
          release_types,
          poster_path,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('MOVIE NEW ERROR:', err);
    return NextResponse.json({ ok: false, error: err.message || 'Upload failed' }, { status: 500 });
  }
}