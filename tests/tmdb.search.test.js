// Mock external TMDb fetch
const fetchMock = jest.fn(async (url, opts) => ({
  ok: true,
  status: 200,
  json: async () => ({ results: [{ id: 100, title: 'Fake TMDb Movie' }] }),
  text: async () => JSON.stringify({ results: [{ id: 100, title: 'Fake TMDb Movie' }] }),
}));

global.fetch = fetchMock;

const { makeURL, jsonOf } = require('./helpers/request');

describe('GET /api/tmdb/search', () => {
  it('proxies to TMDb and returns results (mocked fetch)', async () => {
    const mod = require('../src/app/api/tmdb/search/route.js');
    const req = new Request(makeURL('/api/tmdb/search', { q: 'Inception' }));
    const res = await mod.GET(req);
    expect(res.status).toBe(200);
    const data = await jsonOf(res);
    expect(Array.isArray(data.results)).toBe(true);
  });
});
