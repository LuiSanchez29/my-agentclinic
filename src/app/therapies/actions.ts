"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createTherapy,
  updateTherapy,
  type TherapyInput,
} from "@/db/therapies";
import {
  associateTherapyAilment,
  dissociateTherapyAilment,
} from "@/db/relationships";

export interface TherapyFormState {
  error?: string;
}

function parse(formData: FormData): TherapyInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const duration = Number(formData.get("duration_min"));

  if (!name) return { error: "Name is required." };
  if (!Number.isFinite(duration) || duration < 1) {
    return { error: "Duration must be a positive number of minutes." };
  }

  return {
    name,
    description: description || null,
    duration_min: Math.round(duration),
  };
}

export async function createTherapyAction(
  _prev: TherapyFormState,
  formData: FormData,
): Promise<TherapyFormState> {
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  const id = createTherapy(parsed);
  revalidatePath("/therapies");
  redirect(`/therapies/${id}`);
}

export async function updateTherapyAction(
  id: number,
  _prev: TherapyFormState,
  formData: FormData,
): Promise<TherapyFormState> {
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  updateTherapy(id, parsed);
  revalidatePath("/therapies");
  revalidatePath(`/therapies/${id}`);
  redirect(`/therapies/${id}`);
}

/** Associate an ailment with a therapy (from the therapy detail page). */
export async function associateAilmentAction(formData: FormData): Promise<void> {
  const therapyId = Number(formData.get("therapy_id"));
  const ailmentId = Number(formData.get("ailment_id"));
  if (Number.isFinite(therapyId) && Number.isFinite(ailmentId)) {
    associateTherapyAilment(therapyId, ailmentId);
    revalidatePath(`/therapies/${therapyId}`);
    revalidatePath(`/ailments/${ailmentId}`);
  }
}

/** Remove an ailment association (from the therapy detail page). */
export async function dissociateAilmentAction(
  formData: FormData,
): Promise<void> {
  const therapyId = Number(formData.get("therapy_id"));
  const ailmentId = Number(formData.get("ailment_id"));
  if (Number.isFinite(therapyId) && Number.isFinite(ailmentId)) {
    dissociateTherapyAilment(therapyId, ailmentId);
    revalidatePath(`/therapies/${therapyId}`);
    revalidatePath(`/ailments/${ailmentId}`);
  }
}
