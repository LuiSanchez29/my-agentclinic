import { db } from "@/db/index";

/** Wipe all rows so each test starts from a known, empty state. */
export function resetDb(): void {
  db.exec("DELETE FROM agent_ailments");
  db.exec("DELETE FROM therapy_ailments");
  db.exec("DELETE FROM appointments");
  db.exec("DELETE FROM ailments");
  db.exec("DELETE FROM therapies");
  db.exec("DELETE FROM agents");
  db.exec(
    "DELETE FROM sqlite_sequence WHERE name IN ('agents','ailments','therapies','appointments')",
  );
}
