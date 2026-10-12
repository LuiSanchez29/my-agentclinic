import { describe, it, expect, beforeEach } from "vitest";
import { createAgent } from "@/db/agents";
import { createAilment } from "@/db/ailments";
import { createAppointment } from "@/db/appointments";
import { attachAilmentToAgent } from "@/db/relationships";
import {
  getStats,
  getUpcomingAppointments,
  getRecentCompleted,
  getTopAilments,
} from "@/db/dashboard";
import { resetDb } from "./helpers";

describe("dashboard aggregation", () => {
  beforeEach(() => resetDb());

  it("reports correct stats", () => {
    const a1 = createAgent({ name: "A", model: "m" });
    createAgent({ name: "B", model: "m" });
    createAppointment({ agent_id: a1, scheduled_at: "2026-11-01 10:00", status: "scheduled" });
    createAppointment({ agent_id: a1, scheduled_at: "2026-10-01 10:00", status: "completed" });

    const stats = getStats();
    expect(stats.agents).toBe(2);
    expect(stats.appointments).toBe(2);
    expect(stats.scheduled).toBe(1);
    expect(stats.completed).toBe(1);
  });

  it("returns only scheduled upcoming, ascending", () => {
    const a = createAgent({ name: "A", model: "m" });
    createAppointment({ agent_id: a, scheduled_at: "2026-12-01 10:00", status: "scheduled" });
    createAppointment({ agent_id: a, scheduled_at: "2026-11-01 10:00", status: "scheduled" });
    createAppointment({ agent_id: a, scheduled_at: "2026-10-01 10:00", status: "completed" });

    const upcoming = getUpcomingAppointments(5);
    expect(upcoming.map((u) => u.scheduled_at)).toEqual([
      "2026-11-01 10:00",
      "2026-12-01 10:00",
    ]);
    expect(upcoming.every((u) => u.status === "scheduled")).toBe(true);
  });

  it("returns completed, most recent first", () => {
    const a = createAgent({ name: "A", model: "m" });
    createAppointment({ agent_id: a, scheduled_at: "2026-09-01 10:00", status: "completed" });
    createAppointment({ agent_id: a, scheduled_at: "2026-10-01 10:00", status: "completed" });

    const done = getRecentCompleted(5);
    expect(done.map((d) => d.scheduled_at)).toEqual([
      "2026-10-01 10:00",
      "2026-09-01 10:00",
    ]);
  });

  it("ranks top ailments by affected-agent count", () => {
    const a1 = createAgent({ name: "A", model: "m" });
    const a2 = createAgent({ name: "B", model: "m" });
    const common = createAilment({ name: "Common", severity: "mild" });
    const rare = createAilment({ name: "Rare", severity: "mild" });
    attachAilmentToAgent(a1, common);
    attachAilmentToAgent(a2, common);
    attachAilmentToAgent(a1, rare);

    const top = getTopAilments(5);
    expect(top[0].name).toBe("Common");
    expect(top[0].agent_count).toBe(2);
    expect(top[1].agent_count).toBe(1);
  });
});
