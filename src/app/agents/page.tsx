import Link from "next/link";
import { listAgents } from "@/db/agents";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agents" };

export default function AgentsPage() {
  const agents = listAgents();

  return (
    <main className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">AgentClinic</p>
          <h1 className="page__title">Agents</h1>
        </div>
        <Link href="/agents/new" className="btn btn--primary">
          + New agent
        </Link>
      </header>

      {agents.length === 0 ? (
        <p className="empty">No agents yet. Admit the first patient.</p>
      ) : (
        <ul className="cards">
          {agents.map((agent) => (
            <li key={agent.id} className="card">
              <Link href={`/agents/${agent.id}`} className="card__link">
                <h2 className="card__title">{agent.name}</h2>
                <p className="card__meta">{agent.model}</p>
                {agent.handler ? (
                  <p className="card__sub">Handler: {agent.handler}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
