"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AgentFormState } from "./actions";
import type { Agent } from "@/db/types";

type Action = (
  prev: AgentFormState,
  formData: FormData,
) => Promise<AgentFormState>;

export function AgentForm({
  action,
  agent,
  submitLabel,
  cancelHref,
}: {
  action: Action;
  agent?: Agent;
  submitLabel: string;
  cancelHref: string;
}) {
  const [state, formAction, pending] = useActionState<AgentFormState, FormData>(
    action,
    {},
  );

  return (
    <form action={formAction} className="form">
      {state.error ? <p className="form__error">{state.error}</p> : null}

      <label className="form__field">
        <span>Name</span>
        <input name="name" defaultValue={agent?.name ?? ""} required />
      </label>

      <label className="form__field">
        <span>Model</span>
        <input
          name="model"
          defaultValue={agent?.model ?? ""}
          placeholder="e.g. gpt-4o"
          required
        />
      </label>

      <label className="form__field">
        <span>Handler</span>
        <input
          name="handler"
          defaultValue={agent?.handler ?? ""}
          placeholder="The human operating them"
        />
      </label>

      <label className="form__field">
        <span>Bio</span>
        <textarea name="bio" rows={4} defaultValue={agent?.bio ?? ""} />
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
