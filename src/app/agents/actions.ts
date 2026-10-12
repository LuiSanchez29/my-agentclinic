"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAgent, updateAgent, type AgentInput } from "@/db/agents";
import {
  attachAilmentToAgent,
  removeAilmentFromAgent,
} from "@/db/relationships";

export interface AgentFormState {
  error?: string;
}

function parse(formData: FormData): AgentInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const handler = String(formData.get("handler") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();

  if (!name) return { error: "Name is required." };
  if (!model) return { error: "Model is required." };

  return {
    name,
    model,
    handler: handler || null,
    bio: bio || null,
  };
}

export async function createAgentAction(
  _prev: AgentFormState,
  formData: FormData,
): Promise<AgentFormState> {
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  const id = createAgent(parsed);
  revalidatePath("/agents");
  redirect(`/agents/${id}`);
}

export async function updateAgentAction(
  id: number,
  _prev: AgentFormState,
  formData: FormData,
): Promise<AgentFormState> {
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  updateAgent(id, parsed);
  revalidatePath("/agents");
  revalidatePath(`/agents/${id}`);
  redirect(`/agents/${id}`);
}

/** Attach an ailment to an agent (from the agent detail page). */
export async function attachAilmentAction(formData: FormData): Promise<void> {
  const agentId = Number(formData.get("agent_id"));
  const ailmentId = Number(formData.get("ailment_id"));
  if (Number.isFinite(agentId) && Number.isFinite(ailmentId)) {
    attachAilmentToAgent(agentId, ailmentId);
    revalidatePath(`/agents/${agentId}`);
    revalidatePath(`/ailments/${ailmentId}`);
  }
}

/** Remove an ailment from an agent (from the agent detail page). */
export async function removeAilmentAction(formData: FormData): Promise<void> {
  const agentId = Number(formData.get("agent_id"));
  const ailmentId = Number(formData.get("ailment_id"));
  if (Number.isFinite(agentId) && Number.isFinite(ailmentId)) {
    removeAilmentFromAgent(agentId, ailmentId);
    revalidatePath(`/agents/${agentId}`);
    revalidatePath(`/ailments/${ailmentId}`);
  }
}
