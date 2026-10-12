import Link from "next/link";
import {
  getStats,
  getUpcomingAppointments,
  getRecentCompleted,
  getTopAilments,
} from "@/db/dashboard";
import { formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const stats = getStats();
  const upcoming = getUpcomingAppointments(5);
  const completed = getRecentCompleted(5);
  const topAilments = getTopAilments(5);

  return (
    <main className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">AgentClinic</p>
          <h1 className="page__title">Clinic dashboard</h1>
        </div>
        <Link href="/appointments/new" className="btn btn--primary">
          + Book appointment
        </Link>
      </header>

      <section className="stats">
        <Link href="/agents" className="stat">
          <span className="stat__num">{stats.agents}</span>
          <span className="stat__label">Agents</span>
        </Link>
        <Link href="/ailments" className="stat">
          <span className="stat__num">{stats.ailments}</span>
          <span className="stat__label">Ailments</span>
        </Link>
        <Link href="/therapies" className="stat">
          <span className="stat__num">{stats.therapies}</span>
          <span className="stat__label">Therapies</span>
        </Link>
        <Link href="/appointments" className="stat">
          <span className="stat__num">{stats.appointments}</span>
          <span className="stat__label">
            Appointments
            <small>
              {stats.scheduled} scheduled · {stats.completed} done
            </small>
          </span>
        </Link>
      </section>

      <div className="dash-grid">
        <section className="section">
          <div className="section__head">
            <h2 className="section__title">Upcoming appointments</h2>
            <Link href="/appointments" className="link">
              All
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="empty">Nothing scheduled.</p>
          ) : (
            <ul className="rows">
              {upcoming.map((ap) => (
                <li key={ap.id} className="row">
                  <Link href={`/appointments/${ap.id}`} className="row__link">
                    <span className="row__main">
                      <strong>{ap.agent_name}</strong>
                      {ap.therapy_name ? ` · ${ap.therapy_name}` : ""}
                    </span>
                    <span className="row__meta">
                      {formatDateTime(ap.scheduled_at)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2 className="section__title">Recently completed</h2>
          {completed.length === 0 ? (
            <p className="empty">No completed visits yet.</p>
          ) : (
            <ul className="rows">
              {completed.map((ap) => (
                <li key={ap.id} className="row">
                  <Link href={`/appointments/${ap.id}`} className="row__link">
                    <span className="row__main">
                      <strong>{ap.agent_name}</strong>
                      {ap.therapy_name ? ` · ${ap.therapy_name}` : ""}
                    </span>
                    <span className="row__meta">
                      {formatDateTime(ap.scheduled_at)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2 className="section__title">Top ailments</h2>
          {topAilments.length === 0 ? (
            <p className="empty">No ailments catalogued.</p>
          ) : (
            <ul className="rows">
              {topAilments.map((a) => (
                <li key={a.id} className="row">
                  <Link href={`/ailments/${a.id}`} className="row__link">
                    <span className="row__main">
                      {a.name}{" "}
                      <span className={`badge badge--${a.severity}`}>
                        {a.severity}
                      </span>
                    </span>
                    <span className="row__meta">
                      {a.agent_count} agent{a.agent_count === 1 ? "" : "s"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2 className="section__title">Quick actions</h2>
          <div className="quick-actions">
            <Link href="/appointments/new" className="btn">
              Book appointment
            </Link>
            <Link href="/agents/new" className="btn">
              Admit agent
            </Link>
            <Link href="/ailments/new" className="btn">
              Add ailment
            </Link>
            <Link href="/therapies/new" className="btn">
              Add therapy
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
