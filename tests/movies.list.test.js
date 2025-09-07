const { makeURL, jsonOf } = require('./helpers/request');

const TITLE = 'The Conjuring Last Rites';

describe('GET /api/movies/list (real DB)', () => {
  it(`returns the seeded movie "${TITLE}"`, async () => {
    // import the App Router route (ESM handled by babel-jest)
    const mod = require('../src/app/api/movies/list/route.js');

    // search by exact title; keep page/limit small
    const req = new Request(
      makeURL('/api/movies/list', { q: TITLE, page: 1, limit: 10 })
    );

    const res = await mod.GET(req);
    expect(res.status).toBe(200);

    const data = await jsonOf(res);
    expect(data.ok).toBe(true);
    expect(Array.isArray(data.items)).toBe(true);

    // find the seeded movie in results
    const movie = data.items.find(it => it.title === TITLE);
    expect(movie).toBeTruthy();

    // sanity checks on fields
    // (release_date may serialize differently, so don't assert exact string)
    expect(typeof movie.poster_path).toBe('string');
    expect(Array.isArray(movie.release_types)).toBe(true);
    expect(movie.release_types).toEqual(
      expect.arrayContaining(['IMAX', '4DX'])
    );
  });
});
