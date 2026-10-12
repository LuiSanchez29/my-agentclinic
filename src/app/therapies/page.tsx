import Link from "next/link";
import { listTherapies } from "@/db/therapies";

export const dynamic = "force-dynamic";
export const metadata = { title: "Therapies" };

export default function TherapiesPage() {
  const therapies = listTherapies();

  return (
    <main className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">AgentClinic</p>
          <h1 className="page__title">Therapies</h1>
        </div>
        <Link href="/therapies/new" className="btn btn--primary">
          + New therapy
        </Link>
      </header>

      {therapies.length === 0 ? (
        <p className="empty">No therapies on offer yet.</p>
      ) : (
        <ul className="cards">
          {therapies.map((therapy) => (
            <li key={therapy.id} className="card">
              <Link href={`/therapies/${therapy.id}`} className="card__link">
                <h2 className="card__title">{therapy.name}</h2>
                <p className="card__meta">{therapy.duration_min} min</p>
                {therapy.description ? (
                  <p className="card__sub">{therapy.description}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
