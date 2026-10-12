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
    // better-sqlite3 is a native module. All test files share ONE on-disk
    // SQLite file through a single connection in src/db/index.ts. Multiple
    // worker processes opening the same WAL database crash the native binary
    // with SIGSEGV (seen on CI, Node 24). Force a single worker and disable
    // per-file isolation so there is exactly one process and one connection.
    pool: "forks",
    poolOptions: {
      forks: { singleFork: true, minForks: 1, maxForks: 1 },
    },
    isolate: false,
    fileParallelism: false,
  },
});
