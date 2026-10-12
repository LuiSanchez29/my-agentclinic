import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgent } from "@/db/agents";
import { listAilments } from "@/db/ailments";
import { listAilmentsForAgent } from "@/db/relationships";
import { listAppointmentsForAgent } from "@/db/appointments";
import { formatDateTime } from "@/lib/format";
import { attachAilmentAction, removeAilmentAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agentId = Number(id);
  const agent = getAgent(agentId);
  if (!agent) notFound();

  const ailments = listAilmentsForAgent(agentId);
  const ailmentIds = new Set(ailments.map((a) => a.id));
  const available = listAilments().filter((a) => !ailmentIds.has(a.id));
  const appointments = listAppointmentsForAgent(agentId);

  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/agents" className="link">
              Agents
            </Link>{" "}
            / {agent.name}
          </p>
          <h1 className="page__title">{agent.name}</h1>
        </div>
        <Link href={`/agents/${agent.id}/edit`} className="btn">
          Edit
        </Link>
      </header>

      <dl className="detail">
        <div className="detail__row">
          <dt>Model</dt>
          <dd>{agent.model}</dd>
        </div>
        <div className="detail__row">
          <dt>Handler</dt>
          <dd>{agent.handler ?? "—"}</dd>
        </div>
        <div className="detail__row">
          <dt>Bio</dt>
          <dd>{agent.bio ?? "—"}</dd>
        </div>
        <div className="detail__row">
          <dt>Admitted</dt>
          <dd>{agent.created_at}</dd>
        </div>
      </dl>

      <section className="section">
        <h2 className="section__title">Ailments</h2>
        {ailments.length === 0 ? (
          <p className="empty">No ailments recorded for this agent.</p>
        ) : (
          <ul className="chips">
            {ailments.map((a) => (
              <li key={a.id} className="chip chip--removable">
                <Link href={`/ailments/${a.id}`} className="chip__text">
                  {a.name}
                </Link>
                <form action={removeAilmentAction}>
                  <input type="hidden" name="agent_id" value={agent.id} />
                  <input type="hidden" name="ailment_id" value={a.id} />
                  <button
                    type="submit"
                    className="chip__remove"
                    aria-label={`Remove ${a.name}`}
                  >
                    ×
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        {available.length > 0 ? (
          <form action={attachAilmentAction} className="inline-form">
            <input type="hidden" name="agent_id" value={agent.id} />
            <select name="ailment_id" defaultValue="" required>
              <option value="" disabled>
                Record an ailment…
              </option>
              {available.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn">
              Attach
            </button>
          </form>
        ) : null}
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Appointments</h2>
          <Link href={`/appointments/new?agent=${agent.id}`} className="btn">
            Book appointment
          </Link>
        </div>
        {appointments.length === 0 ? (
          <p className="empty">No appointments for this agent.</p>
        ) : (
          <ul className="rows">
            {appointments.map((ap) => (
              <li key={ap.id} className="row">
                <Link href={`/appointments/${ap.id}`} className="row__link">
                  <span className="row__main">
                    {ap.therapy_name ?? "General visit"}
                  </span>
                  <span className="row__meta">
                    {formatDateTime(ap.scheduled_at)}
                  </span>
                  <span className={`badge badge--${ap.status}`}>
                    {ap.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
