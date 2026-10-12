import Link from "next/link";
import { listAppointments } from "@/db/appointments";
import { formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata = { title: "Appointments" };

export default function AppointmentsPage() {
  const appointments = listAppointments();

  return (
    <main className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">AgentClinic</p>
          <h1 className="page__title">Appointments</h1>
        </div>
        <Link href="/appointments/new" className="btn btn--primary">
          + Book appointment
        </Link>
      </header>

      {appointments.length === 0 ? (
        <p className="empty">No appointments booked yet.</p>
      ) : (
        <ul className="rows">
          {appointments.map((ap) => (
            <li key={ap.id} className="row">
              <Link href={`/appointments/${ap.id}`} className="row__link">
                <span className="row__main">
                  <strong>{ap.agent_name}</strong>
                  {ap.therapy_name ? ` · ${ap.therapy_name}` : ""}
                </span>
                <span className="row__meta">
                  {formatDateTime(ap.scheduled_at)}
                </span>
                <span className={`badge badge--${ap.status}`}>{ap.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
