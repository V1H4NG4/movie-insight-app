# Test Suite (Jest) for Next.js App Router APIs

This `tests/` suite targets **Next.js App Router** route files in `src/app/api/**/route.js`.
It uses **Jest** and **pure function calls** (no server) + **mocks** to avoid touching your real DB or filesystem.

## Install
```bash
npm i -D jest cross-env dotenv
```
> Already using Node v18+ (global Fetch/Request/Response).

## Scripts
Add to your `package.json`:
```json
{ "scripts": { "test": "cross-env NODE_ENV=test jest --runInBand" } }
```

## Safety (Non-destructive)
- DB access is **mocked** by `tests/__mocks__/db.js`. No real queries will run.
- File writes are **mocked** in `movies.new.test.js` (`fs/promises`).
- External TMDb fetch is **mocked** in `tmdb.search.test.js`.

If you want **real DB integration tests**, create a separate DB (`movie_app_test`) and delete the mocks for specific tests.

## Run
```bash
npm test
```
Screenshot the green **PASS** lines for your report.

## Files
- `tests/admin.ping.test.js`
- `tests/admin.list.test.js`
- `tests/admin.login.test.js`
- `tests/movies.list.test.js`
- `tests/movies.new.test.js`
- `tests/tmdb.search.test.js`
- `tests/helpers/request.js`
- `tests/__mocks__/db.js`
- `.env.test`
- `jest.config.js`
