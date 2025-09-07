// Mock for lib/db.js used by API routes (mysql2 pool-like)
function createMockPool() {
  return {
    async query(sql, params) {
      sql = String(sql).toLowerCase();
      if (sql.includes("select now() as now")) {
        return [[{ now: "2025-09-06 10:00:00" }], []];
      }
      if (sql.includes("from admins")) {
        // return a couple of fake admins (no password)
        return [[
          { id: 1, username: "root", email: "root@example.com", level: 9, created_at: "2025-01-01", updated_at: "2025-01-02" },
          { id: 2, username: "mod",  email: "mod@example.com",  level: 5, created_at: "2025-02-01", updated_at: "2025-02-02" }
        ], []];
      }
      if (sql.includes("from movies")) {
        // simplified mock movie rows
        return [[
          { id: 10, title: "Mock Movie", release_date: "2025-09-01", release_types: "[]", poster_path: "/m/mock.jpg" }
        ], []];
      }
      // default
      return [[[]], []];
    },
    async execute(sql, params) {
      const low = String(sql).toLowerCase();
      if (low.includes("from admins")) {
        // Simulate login success if identifier matches
        const identifier = params?.[0] ?? "";
        const pass = params?.[1] ?? "";
        if (identifier && pass) {
          return [[{ id: 1, username: "root", email: "root@example.com", level: 9 }], []];
        }
        return [[], []];
      }
      if (low.startsWith("insert into movies")) {
        return [{ insertId: 999 }];
      }
      return [[], []];
    }
  };
}

const pool = createMockPool();

module.exports = {
  getDb: () => pool
};
