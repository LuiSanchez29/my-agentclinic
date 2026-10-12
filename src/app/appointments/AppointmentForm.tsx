"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AppointmentFormState } from "./actions";
import type { Appointment, Agent, Ailment, Therapy } from "@/db/types";

type Action = (
  prev: AppointmentFormState,
  formData: FormData,
) => Promise<AppointmentFormState>;

export function AppointmentForm({
  action,
  appointment,
  agents,
  therapies,
  ailments,
  defaultAgentId,
  submitLabel,
  cancelHref,
}: {
  action: Action;
  appointment?: Appointment;
  agents: Agent[];
  therapies: Therapy[];
  ailments: Ailment[];
  defaultAgentId?: number;
  submitLabel: string;
  cancelHref: string;
}) {
  const [state, formAction, pending] = useActionState<
    AppointmentFormState,
    FormData
  >(action, {});

  const agentValue = String(
    appointment?.agent_id ?? defaultAgentId ?? agents[0]?.id ?? "",
  );

  return (
    <form action={formAction} className="form">
      {state.error ? <p className="form__error">{state.error}</p> : null}

      <label className="form__field">
        <span>Agent</span>
        <select name="agent_id" defaultValue={agentValue} required>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form__field">
        <span>Therapy (optional)</span>
        <select name="therapy_id" defaultValue={appointment?.therapy_id ?? ""}>
          <option value="">— none —</option>
          {therapies.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form__field">
        <span>Ailment (optional)</span>
        <select name="ailment_id" defaultValue={appointment?.ailment_id ?? ""}>
          <option value="">— none —</option>
          {ailments.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form__field">
        <span>Date &amp; time</span>
        <input
          name="scheduled_at"
          type="datetime-local"
          defaultValue={toLocalInput(appointment?.scheduled_at)}
          required
        />
      </label>

      <label className="form__field">
        <span>Status</span>
        <select name="status" defaultValue={appointment?.status ?? "scheduled"}>
          <option value="scheduled">scheduled</option>
          <option value="completed">completed</option>
          <option value="cancelled">cancelled</option>
        </select>
      </label>

      <label className="form__field">
        <span>Notes</span>
        <textarea name="notes" rows={3} defaultValue={appointment?.notes ?? ""} />
      </label>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link href={cancelHref} className="btn">
          Cancel
        </Link>
      </div>
    </form>
  );
}

// Convert a stored "YYYY-MM-DD HH:MM" value to the datetime-local format
// ("YYYY-MM-DDTHH:MM"). Returns "" when absent.
function toLocalInput(value?: string): string {
  if (!value) return "";
  return value.replace(" ", "T").slice(0, 16);
}
