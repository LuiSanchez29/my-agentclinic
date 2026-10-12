import { describe, it, expect, beforeEach } from "vitest";
import { createAgent } from "@/db/agents";
import { createAilment } from "@/db/ailments";
import { createTherapy } from "@/db/therapies";
import {
  attachAilmentToAgent,
  removeAilmentFromAgent,
  listAilmentsForAgent,
  listAgentsForAilment,
  associateTherapyAilment,
  dissociateTherapyAilment,
  listAilmentsForTherapy,
  listTherapiesForAilment,
} from "@/db/relationships";
import { resetDb } from "./helpers";

describe("relationships", () => {
  beforeEach(() => resetDb());

  it("attaches an ailment to an agent and is idempotent", () => {
    const agent = createAgent({ name: "Clippy", model: "assistant" });
    const ailment = createAilment({ name: "Prompt Fatigue", severity: "moderate" });

    attachAilmentToAgent(agent, ailment);
    attachAilmentToAgent(agent, ailment); // duplicate → no-op

    expect(listAilmentsForAgent(agent)).toHaveLength(1);
    expect(listAgentsForAilment(ailment).map((a) => a.name)).toEqual(["Clippy"]);
  });

  it("removes an ailment from an agent", () => {
    const agent = createAgent({ name: "Echo", model: "whisper" });
    const ailment = createAilment({ name: "Rate-Limit Anxiety", severity: "mild" });
    attachAilmentToAgent(agent, ailment);
    removeAilmentFromAgent(agent, ailment);
    expect(listAilmentsForAgent(agent)).toHaveLength(0);
  });

  it("associates and dissociates therapy↔ailment idempotently", () => {
    const therapy = createTherapy({ name: "Token Detox", duration_min: 45 });
    const ailment = createAilment({ name: "Prompt Fatigue", severity: "moderate" });

    associateTherapyAilment(therapy, ailment);
    associateTherapyAilment(therapy, ailment); // duplicate → no-op
    expect(listAilmentsForTherapy(therapy)).toHaveLength(1);
    expect(listTherapiesForAilment(ailment).map((t) => t.name)).toEqual(["Token Detox"]);

    dissociateTherapyAilment(therapy, ailment);
    expect(listAilmentsForTherapy(therapy)).toHaveLength(0);
  });
});
