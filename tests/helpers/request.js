// Small helpers to call Next.js App Router route handlers (GET/POST/etc.)

function makeURL(path = "/api/test", query = {}) {
  const u = new URL("http://localhost" + path);
  for (const [k, v] of Object.entries(query || {})) {
    if (v !== undefined && v !== null) u.searchParams.set(k, String(v));
  }
  return u;
}

async function jsonOf(resp) {
  const txt = await resp.text();
  try { return JSON.parse(txt); } catch { return { raw: txt }; }
}

module.exports = { makeURL, jsonOf };
