import Link from "next/link";
import { notFound } from "next/navigation";
import { getTherapy } from "@/db/therapies";
import { listAilments } from "@/db/ailments";
import { listAilmentsForTherapy } from "@/db/relationships";
import { associateAilmentAction, dissociateAilmentAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function TherapyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapyId = Number(id);
  const therapy = getTherapy(therapyId);
  if (!therapy) notFound();

  const treated = listAilmentsForTherapy(therapyId);
  const treatedIds = new Set(treated.map((a) => a.id));
  const available = listAilments().filter((a) => !treatedIds.has(a.id));

  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/therapies" className="link">
              Therapies
            </Link>{" "}
            / {therapy.name}
          </p>
          <h1 className="page__title">{therapy.name}</h1>
        </div>
        <Link href={`/therapies/${therapy.id}/edit`} className="btn">
          Edit
        </Link>
      </header>

      <dl className="detail">
        <div className="detail__row">
          <dt>Duration</dt>
          <dd>{therapy.duration_min} min</dd>
        </div>
        <div className="detail__row">
          <dt>Description</dt>
          <dd>{therapy.description ?? "—"}</dd>
        </div>
      </dl>

      <section className="section">
        <h2 className="section__title">Treats these ailments</h2>
        {treated.length === 0 ? (
          <p className="empty">No ailments associated yet.</p>
        ) : (
          <ul className="chips">
            {treated.map((a) => (
              <li key={a.id} className="chip chip--removable">
                <Link href={`/ailments/${a.id}`} className="chip__text">
                  {a.name}
                </Link>
                <form action={dissociateAilmentAction}>
                  <input type="hidden" name="therapy_id" value={therapy.id} />
                  <input type="hidden" name="ailment_id" value={a.id} />
                  <button
                    type="submit"
                    className="chip__remove"
                    aria-label={`Remove ${a.name}`}
                  >
                    ×
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        {available.length > 0 ? (
          <form action={associateAilmentAction} className="inline-form">
            <input type="hidden" name="therapy_id" value={therapy.id} />
            <select name="ailment_id" defaultValue="" required>
              <option value="" disabled>
                Add an ailment…
              </option>
              {available.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn">
              Associate
            </button>
          </form>
        ) : null}
      </section>
    </main>
  );
}
