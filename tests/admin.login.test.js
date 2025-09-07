const { jsonOf } = require('./helpers/request');

describe('POST /api/admin/login (real DB)', () => {
  it('logs in alpha6 with email + password', async () => {
    const mod = require('../src/app/api/admin/login/route.js');
    const req = new Request('http://localhost/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'alpha.reelevo@gmail.com',   // email OR username 'alpha6'
        password: 'alpha6relevo'                // plain; route should SHA2 in SQL
      })
    });
    const res = await mod.POST(req);
    expect(res.status).toBe(200);
    const data = await jsonOf(res);
    expect(data.ok).toBe(true);
    expect(data.admin).toMatchObject({ email: 'alpha.reelevo@gmail.com' });
  });

  it('400 on missing creds', async () => {
    const mod = require('../src/app/api/admin/login/route.js');
    const req = new Request('http://localhost/api/admin/login', { method: 'POST', body: JSON.stringify({}) });
    const res = await mod.POST(req);
    expect(res.status).toBe(400);
  });
});