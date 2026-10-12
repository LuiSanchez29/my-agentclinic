import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock Next's request-scoped helpers so the Server Actions can run in Node.
// redirect() throws a sentinel so we can assert the success path was reached.
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

import { createAgentAction } from "@/app/agents/actions";
import { createAilmentAction } from "@/app/ailments/actions";
import { createTherapyAction } from "@/app/therapies/actions";
import { createAppointmentAction } from "@/app/appointments/actions";
import { createAgent } from "@/db/agents";
import { listAilments } from "@/db/ailments";
import { listTherapies } from "@/db/therapies";
import { listAppointments } from "@/db/appointments";
import { resetDb } from "./helpers";

function form(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

/** Run an action that should redirect; returns the redirect URL. */
async function expectRedirect(
  run: () => Promise<unknown>,
): Promise<string> {
  try {
    await run();
  } catch (err) {
    const msg = (err as Error).message;
    if (msg.startsWith("NEXT_REDIRECT:")) return msg.slice("NEXT_REDIRECT:".length);
    throw err;
  }
  throw new Error("expected a redirect, but none was thrown");
}

describe("agent actions", () => {
  beforeEach(() => resetDb());

  it("rejects a missing name", async () => {
    const state = await createAgentAction({}, form({ model: "gpt-4o" }));
    expect(state.error).toMatch(/name is required/i);
  });

  it("rejects a missing model", async () => {
    const state = await createAgentAction({}, form({ name: "Ada" }));
    expect(state.error).toMatch(/model is required/i);
  });

  it("creates on valid input and redirects to detail", async () => {
    const url = await expectRedirect(() =>
      createAgentAction({}, form({ name: "Ada", model: "claude" })),
    );
    expect(url).toMatch(/^\/agents\/\d+$/);
  });
});

describe("ailment actions", () => {
  beforeEach(() => resetDb());

  it("rejects a missing name", async () => {
    const state = await createAilmentAction({}, form({ severity: "mild" }));
    expect(state.error).toMatch(/name is required/i);
  });

  it("rejects an invalid severity", async () => {
    const state = await createAilmentAction(
      {},
      form({ name: "X", severity: "extreme" }),
    );
    expect(state.error).toMatch(/severity/i);
  });

  it("creates on valid input", async () => {
    await expectRedirect(() =>
      createAilmentAction({}, form({ name: "Prompt Fatigue", severity: "moderate" })),
    );
    expect(listAilments()).toHaveLength(1);
  });
});

describe("therapy actions", () => {
  beforeEach(() => resetDb());

  it("rejects a non-positive duration", async () => {
    const state = await createTherapyAction(
      {},
      form({ name: "Detox", duration_min: "0" }),
    );
    expect(state.error).toMatch(/duration/i);
  });

  it("creates on valid input", async () => {
    await expectRedirect(() =>
      createTherapyAction({}, form({ name: "Token Detox", duration_min: "45" })),
    );
    expect(listTherapies()).toHaveLength(1);
  });
});

describe("appointment actions", () => {
  beforeEach(() => resetDb());

  it("rejects a missing date/time", async () => {
    const agent = createAgent({ name: "A", model: "m" });
    const state = await createAppointmentAction(
      {},
      form({ agent_id: String(agent), status: "scheduled" }),
    );
    expect(state.error).toMatch(/date and time/i);
  });

  it("creates on valid input", async () => {
    const agent = createAgent({ name: "A", model: "m" });
    await expectRedirect(() =>
      createAppointmentAction(
        {},
        form({
          agent_id: String(agent),
          scheduled_at: "2026-11-01 10:00",
          status: "scheduled",
        }),
      ),
    );
    expect(listAppointments()).toHaveLength(1);
  });
});
