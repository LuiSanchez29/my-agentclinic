import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgent } from "@/db/agents";
import { AgentForm } from "../../AgentForm";
import { updateAgentAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agentId = Number(id);
  const agent = getAgent(agentId);
  if (!agent) notFound();

  const action = updateAgentAction.bind(null, agentId);

  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/agents" className="link">
              Agents
            </Link>{" "}
            /{" "}
            <Link href={`/agents/${agent.id}`} className="link">
              {agent.name}
            </Link>{" "}
            / Edit
          </p>
          <h1 className="page__title">Edit {agent.name}</h1>
        </div>
      </header>

      <AgentForm
        action={action}
        agent={agent}
        submitLabel="Save changes"
        cancelHref={`/agents/${agent.id}`}
      />
    </main>
  );
}
