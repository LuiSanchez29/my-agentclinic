import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    setupFiles: ["tests/setup.ts"],
    // All test files share one on-disk SQLite file via a single better-sqlite3
    // connection. Run every file in ONE process (one fork) so there is exactly
    // one connection — multiple processes opening the same WAL database crash
    // the native binary with SIGSEGV (seen on CI with Node 24).
    pool: "forks",
    poolOptions: {
      forks: { singleFork: true },
    },
    fileParallelism: false,
  },
});
