import Link from "next/link";
import { listAilments } from "@/db/ailments";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ailments" };

export default function AilmentsPage() {
  const ailments = listAilments();

  return (
    <main className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">AgentClinic</p>
          <h1 className="page__title">Ailments</h1>
        </div>
        <Link href="/ailments/new" className="btn btn--primary">
          + New ailment
        </Link>
      </header>

      {ailments.length === 0 ? (
        <p className="empty">No ailments catalogued yet.</p>
      ) : (
        <ul className="cards">
          {ailments.map((ailment) => (
            <li key={ailment.id} className="card">
              <Link href={`/ailments/${ailment.id}`} className="card__link">
                <h2 className="card__title">{ailment.name}</h2>
                <p className="card__meta">{ailment.severity}</p>
                {ailment.description ? (
                  <p className="card__sub">{ailment.description}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
