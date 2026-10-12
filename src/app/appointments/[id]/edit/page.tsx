import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppointment } from "@/db/appointments";
import { listAgents } from "@/db/agents";
import { listTherapies } from "@/db/therapies";
import { listAilments } from "@/db/ailments";
import { AppointmentForm } from "../../AppointmentForm";
import { updateAppointmentAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditAppointmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointmentId = Number(id);
  const appointment = getAppointment(appointmentId);
  if (!appointment) notFound();

  const agents = listAgents();
  const therapies = listTherapies();
  const ailments = listAilments();
  const action = updateAppointmentAction.bind(null, appointmentId);

  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/appointments" className="link">
              Appointments
            </Link>{" "}
            /{" "}
            <Link href={`/appointments/${appointment.id}`} className="link">
              #{appointment.id}
            </Link>{" "}
            / Edit
          </p>
          <h1 className="page__title">Reschedule #{appointment.id}</h1>
        </div>
      </header>

      <AppointmentForm
        action={action}
        appointment={appointment}
        agents={agents}
        therapies={therapies}
        ailments={ailments}
        submitLabel="Save changes"
        cancelHref={`/appointments/${appointment.id}`}
      />
    </main>
  );
}
