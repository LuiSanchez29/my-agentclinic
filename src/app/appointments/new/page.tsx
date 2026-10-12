import Link from "next/link";
import { listAgents } from "@/db/agents";
import { listTherapies } from "@/db/therapies";
import { listAilments } from "@/db/ailments";
import { AppointmentForm } from "../AppointmentForm";
import { createAppointmentAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ agent?: string }>;
}) {
  const { agent } = await searchParams;
  const agents = listAgents();
  const therapies = listTherapies();
  const ailments = listAilments();
  const defaultAgentId = agent ? Number(agent) : undefined;

  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/appointments" className="link">
              Appointments
            </Link>{" "}
            / New
          </p>
          <h1 className="page__title">Book an appointment</h1>
        </div>
      </header>

      <AppointmentForm
        action={createAppointmentAction}
        agents={agents}
        therapies={therapies}
        ailments={ailments}
        defaultAgentId={defaultAgentId}
        submitLabel="Book appointment"
        cancelHref="/appointments"
      />
    </main>
  );
}
