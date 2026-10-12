"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createAppointment,
  updateAppointment,
  setAppointmentStatus,
  type AppointmentInput,
} from "@/db/appointments";
import type { AppointmentStatus } from "@/db/types";

export interface AppointmentFormState {
  error?: string;
}

const STATUSES: AppointmentStatus[] = ["scheduled", "completed", "cancelled"];

function parse(formData: FormData): AppointmentInput | { error: string } {
  const agentId = Number(formData.get("agent_id"));
  const therapyRaw = String(formData.get("therapy_id") ?? "").trim();
  const ailmentRaw = String(formData.get("ailment_id") ?? "").trim();
  const scheduledAt = String(formData.get("scheduled_at") ?? "").trim();
  const status = String(formData.get("status") ?? "scheduled").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!Number.isFinite(agentId) || agentId < 1) {
    return { error: "An agent is required." };
  }
  if (!scheduledAt) {
    return { error: "A date and time is required." };
  }
  if (!STATUSES.includes(status as AppointmentStatus)) {
    return { error: "Invalid status." };
  }

  return {
    agent_id: agentId,
    therapy_id: therapyRaw ? Number(therapyRaw) : null,
    ailment_id: ailmentRaw ? Number(ailmentRaw) : null,
    scheduled_at: scheduledAt,
    status: status as AppointmentStatus,
    notes: notes || null,
  };
}

export async function createAppointmentAction(
  _prev: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  const id = createAppointment(parsed);
  revalidatePath("/appointments");
  revalidatePath(`/agents/${parsed.agent_id}`);
  redirect(`/appointments/${id}`);
}

export async function updateAppointmentAction(
  id: number,
  _prev: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  updateAppointment(id, parsed);
  revalidatePath("/appointments");
  revalidatePath(`/appointments/${id}`);
  revalidatePath(`/agents/${parsed.agent_id}`);
  redirect(`/appointments/${id}`);
}

/** Change status from the detail page (inline form). */
export async function setStatusAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "").trim();
  if (Number.isFinite(id) && STATUSES.includes(status as AppointmentStatus)) {
    setAppointmentStatus(id, status as AppointmentStatus);
    revalidatePath("/appointments");
    revalidatePath(`/appointments/${id}`);
  }
}
