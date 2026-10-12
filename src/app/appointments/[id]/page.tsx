import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppointmentWithRefs } from "@/db/appointments";
import { formatDateTime } from "@/lib/format";
import { setStatusAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointmentId = Number(id);
  const ap = getAppointmentWithRefs(appointmentId);
  if (!ap) notFound();

  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/appointments" className="link">
              Appointments
            </Link>{" "}
            / #{ap.id}
          </p>
          <h1 className="page__title">
            {ap.agent_name}{" "}
            <span className={`badge badge--${ap.status}`}>{ap.status}</span>
          </h1>
        </div>
        <Link href={`/appointments/${ap.id}/edit`} className="btn">
          Reschedule
        </Link>
      </header>

      <dl className="detail">
        <div className="detail__row">
          <dt>Agent</dt>
          <dd>
            <Link href={`/agents/${ap.agent_id}`} className="link">
              {ap.agent_name}
            </Link>
          </dd>
        </div>
        <div className="detail__row">
          <dt>Therapy</dt>
          <dd>
            {ap.therapy_id ? (
              <Link href={`/therapies/${ap.therapy_id}`} className="link">
                {ap.therapy_name}
              </Link>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div className="detail__row">
          <dt>Ailment</dt>
          <dd>
            {ap.ailment_id ? (
              <Link href={`/ailments/${ap.ailment_id}`} className="link">
                {ap.ailment_name}
              </Link>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div className="detail__row">
          <dt>When</dt>
          <dd>{formatDateTime(ap.scheduled_at)}</dd>
        </div>
        <div className="detail__row">
          <dt>Notes</dt>
          <dd>{ap.notes ?? "—"}</dd>
        </div>
      </dl>

      <section className="section">
        <h2 className="section__title">Status</h2>
        <div className="inline-form">
          {ap.status !== "completed" ? (
            <form action={setStatusAction}>
              <input type="hidden" name="id" value={ap.id} />
              <input type="hidden" name="status" value="completed" />
              <button type="submit" className="btn">
                Mark completed
              </button>
            </form>
          ) : null}
          {ap.status !== "cancelled" ? (
            <form action={setStatusAction}>
              <input type="hidden" name="id" value={ap.id} />
              <input type="hidden" name="status" value="cancelled" />
              <button type="submit" className="btn">
                Cancel appointment
              </button>
            </form>
          ) : null}
          {ap.status !== "scheduled" ? (
            <form action={setStatusAction}>
              <input type="hidden" name="id" value={ap.id} />
              <input type="hidden" name="status" value="scheduled" />
              <button type="submit" className="btn">
                Reopen (scheduled)
              </button>
            </form>
          ) : null}
        </div>
      </section>
    </main>
  );
}
