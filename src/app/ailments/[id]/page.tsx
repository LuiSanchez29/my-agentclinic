import Link from "next/link";
import { notFound } from "next/navigation";
import { getAilment } from "@/db/ailments";
import { listTherapiesForAilment, listAgentsForAilment } from "@/db/relationships";

export const dynamic = "force-dynamic";

export default async function AilmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ailmentId = Number(id);
  const ailment = getAilment(ailmentId);
  if (!ailment) notFound();

  const therapies = listTherapiesForAilment(ailmentId);
  const agents = listAgentsForAilment(ailmentId);

  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/ailments" className="link">
              Ailments
            </Link>{" "}
            / {ailment.name}
          </p>
          <h1 className="page__title">{ailment.name}</h1>
        </div>
        <Link href={`/ailments/${ailment.id}/edit`} className="btn">
          Edit
        </Link>
      </header>

      <dl className="detail">
        <div className="detail__row">
          <dt>Severity</dt>
          <dd>{ailment.severity}</dd>
        </div>
        <div className="detail__row">
          <dt>Description</dt>
          <dd>{ailment.description ?? "—"}</dd>
        </div>
      </dl>

      <section className="section">
        <h2 className="section__title">Treated by</h2>
        {therapies.length === 0 ? (
          <p className="empty">No therapies associated yet.</p>
        ) : (
          <ul className="chips">
            {therapies.map((t) => (
              <li key={t.id}>
                <Link href={`/therapies/${t.id}`} className="chip">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section">
        <h2 className="section__title">Affected agents</h2>
        {agents.length === 0 ? (
          <p className="empty">No agents have this ailment.</p>
        ) : (
          <ul className="chips">
            {agents.map((a) => (
              <li key={a.id}>
                <Link href={`/agents/${a.id}`} className="chip">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
