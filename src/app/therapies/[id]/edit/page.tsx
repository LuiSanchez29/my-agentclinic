import Link from "next/link";
import { notFound } from "next/navigation";
import { getTherapy } from "@/db/therapies";
import { TherapyForm } from "../../TherapyForm";
import { updateTherapyAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditTherapyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapyId = Number(id);
  const therapy = getTherapy(therapyId);
  if (!therapy) notFound();

  const action = updateTherapyAction.bind(null, therapyId);

  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/therapies" className="link">
              Therapies
            </Link>{" "}
            /{" "}
            <Link href={`/therapies/${therapy.id}`} className="link">
              {therapy.name}
            </Link>{" "}
            / Edit
          </p>
          <h1 className="page__title">Edit {therapy.name}</h1>
        </div>
      </header>

      <TherapyForm
        action={action}
        therapy={therapy}
        submitLabel="Save changes"
        cancelHref={`/therapies/${therapy.id}`}
      />
    </main>
  );
}
