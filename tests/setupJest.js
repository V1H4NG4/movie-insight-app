jest.mock('next/server', () => ({
  NextResponse: {
    json: (obj, init = {}) =>
      new Response(JSON.stringify(obj), {
        status: init.status ?? 200,
        headers: { 'Content-Type': 'application/json', ...(init.headers || {}) }
      })
  }
}));
jest.setTimeout(30000);
