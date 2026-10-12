"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAilment, updateAilment, type AilmentInput } from "@/db/ailments";
import type { Severity } from "@/db/types";

export interface AilmentFormState {
  error?: string;
}

const SEVERITIES: Severity[] = ["mild", "moderate", "severe"];

function parse(formData: FormData): AilmentInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const severity = String(formData.get("severity") ?? "").trim();

  if (!name) return { error: "Name is required." };
  if (!SEVERITIES.includes(severity as Severity)) {
    return { error: "Severity must be mild, moderate, or severe." };
  }

  return {
    name,
    description: description || null,
    severity: severity as Severity,
  };
}

export async function createAilmentAction(
  _prev: AilmentFormState,
  formData: FormData,
): Promise<AilmentFormState> {
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  const id = createAilment(parsed);
  revalidatePath("/ailments");
  redirect(`/ailments/${id}`);
}

export async function updateAilmentAction(
  id: number,
  _prev: AilmentFormState,
  formData: FormData,
): Promise<AilmentFormState> {
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  updateAilment(id, parsed);
  revalidatePath("/ailments");
  revalidatePath(`/ailments/${id}`);
  redirect(`/ailments/${id}`);
}
