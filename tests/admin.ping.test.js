const { makeURL, jsonOf } = require('./helpers/request');

describe('GET /api/admin/ping (real DB)', () => {
  it('returns ok, time, admins count', async () => {
    const mod = require('../src/app/api/admin/ping/route.js');
    const req = new Request(makeURL('/api/admin/ping'));
    const res = await mod.GET(req);

    expect(res.status).toBe(200);
    const data = await jsonOf(res);
    expect(data.ok).toBe(true);
    expect(data.time).toBeTruthy();
    expect(typeof data.admins).toBe('number');

    // If your test DB has exactly 2 admins:
    expect(data.admins).toBe(2);
    // (or, if you might add more later)
    // expect(data.admins).toBeGreaterThanOrEqual(2);
  });
});

