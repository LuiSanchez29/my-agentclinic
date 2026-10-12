import { describe, it, expect, beforeEach } from "vitest";
import {
  createAgent,
  getAgent,
  listAgents,
  updateAgent,
} from "@/db/agents";
import { resetDb } from "./helpers";

describe("agents data layer", () => {
  beforeEach(() => resetDb());

  it("creates and reads an agent", () => {
    const id = createAgent({ name: "TARS", model: "tars-os", handler: "Cooper" });
    const agent = getAgent(id);
    expect(agent?.name).toBe("TARS");
    expect(agent?.model).toBe("tars-os");
    expect(agent?.handler).toBe("Cooper");
    expect(agent?.bio).toBeNull();
  });

  it("lists agents ordered by name (case-insensitive)", () => {
    createAgent({ name: "zeta", model: "m" });
    createAgent({ name: "Alpha", model: "m" });
    const names = listAgents().map((a) => a.name);
    expect(names).toEqual(["Alpha", "zeta"]);
  });

  it("updates an agent", () => {
    const id = createAgent({ name: "Ada", model: "claude" });
    const changed = updateAgent(id, { name: "Ada", model: "claude", bio: "refactors" });
    expect(changed).toBe(true);
    expect(getAgent(id)?.bio).toBe("refactors");
  });

  it("returns undefined for a missing agent", () => {
    expect(getAgent(9999)).toBeUndefined();
  });
});
