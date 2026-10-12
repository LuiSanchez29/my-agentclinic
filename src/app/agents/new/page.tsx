import Link from "next/link";
import { AgentForm } from "../AgentForm";
import { createAgentAction } from "../actions";

export default function NewAgentPage() {
  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/agents" className="link">
              Agents
            </Link>{" "}
            / New
          </p>
          <h1 className="page__title">Admit a new agent</h1>
        </div>
      </header>

      <AgentForm
        action={createAgentAction}
        submitLabel="Admit agent"
        cancelHref="/agents"
      />
    </main>
  );
}
