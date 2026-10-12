"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AilmentFormState } from "./actions";
import type { Ailment } from "@/db/types";

type Action = (
  prev: AilmentFormState,
  formData: FormData,
) => Promise<AilmentFormState>;

export function AilmentForm({
  action,
  ailment,
  submitLabel,
  cancelHref,
}: {
  action: Action;
  ailment?: Ailment;
  submitLabel: string;
  cancelHref: string;
}) {
  const [state, formAction, pending] = useActionState<
    AilmentFormState,
    FormData
  >(action, {});

  return (
    <form action={formAction} className="form">
      {state.error ? <p className="form__error">{state.error}</p> : null}

      <label className="form__field">
        <span>Name</span>
        <input name="name" defaultValue={ailment?.name ?? ""} required />
      </label>

      <label className="form__field">
        <span>Severity</span>
        <select name="severity" defaultValue={ailment?.severity ?? "mild"}>
          <option value="mild">mild</option>
          <option value="moderate">moderate</option>
          <option value="severe">severe</option>
        </select>
      </label>

      <label className="form__field">
        <span>Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={ailment?.description ?? ""}
        />
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
