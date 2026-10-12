"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { TherapyFormState } from "./actions";
import type { Therapy } from "@/db/types";

type Action = (
  prev: TherapyFormState,
  formData: FormData,
) => Promise<TherapyFormState>;

export function TherapyForm({
  action,
  therapy,
  submitLabel,
  cancelHref,
}: {
  action: Action;
  therapy?: Therapy;
  submitLabel: string;
  cancelHref: string;
}) {
  const [state, formAction, pending] = useActionState<
    TherapyFormState,
    FormData
  >(action, {});

  return (
    <form action={formAction} className="form">
      {state.error ? <p className="form__error">{state.error}</p> : null}

      <label className="form__field">
        <span>Name</span>
        <input name="name" defaultValue={therapy?.name ?? ""} required />
      </label>

      <label className="form__field">
        <span>Duration (minutes)</span>
        <input
          name="duration_min"
          type="number"
          min={1}
          defaultValue={therapy?.duration_min ?? 30}
          required
        />
      </label>

      <label className="form__field">
        <span>Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={therapy?.description ?? ""}
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
