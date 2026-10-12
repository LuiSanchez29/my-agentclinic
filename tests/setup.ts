import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll } from "vitest";

// Point the data layer at a throwaway SQLite file so tests never touch the
// real agentclinic.db. src/db/index.ts reads DATABASE_PATH.
const dir = mkdtempSync(join(tmpdir(), "agentclinic-test-"));
process.env.DATABASE_PATH = join(dir, "test.db");
// NODE_ENV is already "test" under Vitest; it's read-only in the type defs.

afterAll(() => {
  rmSync(dir, { recursive: true, force: true });
});
