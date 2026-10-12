import Link from "next/link";
import { notFound } from "next/navigation";
import { getAilment } from "@/db/ailments";
import { AilmentForm } from "../../AilmentForm";
import { updateAilmentAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditAilmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ailmentId = Number(id);
  const ailment = getAilment(ailmentId);
  if (!ailment) notFound();

  const action = updateAilmentAction.bind(null, ailmentId);

  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/ailments" className="link">
              Ailments
            </Link>{" "}
            /{" "}
            <Link href={`/ailments/${ailment.id}`} className="link">
              {ailment.name}
            </Link>{" "}
            / Edit
          </p>
          <h1 className="page__title">Edit {ailment.name}</h1>
        </div>
      </header>

      <AilmentForm
        action={action}
        ailment={ailment}
        submitLabel="Save changes"
        cancelHref={`/ailments/${ailment.id}`}
      />
    </main>
  );
}
