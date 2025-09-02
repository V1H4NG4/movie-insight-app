export const runtime = 'nodejs';
import { getDb } from '../../../../../lib/db'; // from src/app/api/admin/ping to /lib/db

export async function GET() {
  try {
    const db = getDb();
    const [now] = await db.query('SELECT NOW() AS now');
    const [cnt] = await db.query('SELECT COUNT(*) AS admins FROM admins');
    return new Response(
      JSON.stringify({ ok: true, time: now?.[0]?.now, admins: cnt?.[0]?.admins }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('PING ERROR:', err);
    return new Response(
      JSON.stringify({
        ok: false,
        name: err?.name,
        code: err?.code,
        errno: err?.errno,
        sqlState: err?.sqlState,
        message: err?.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}