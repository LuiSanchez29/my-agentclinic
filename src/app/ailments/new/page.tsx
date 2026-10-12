import Link from "next/link";
import { AilmentForm } from "../AilmentForm";
import { createAilmentAction } from "../actions";

export default function NewAilmentPage() {
  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/ailments" className="link">
              Ailments
            </Link>{" "}
            / New
          </p>
          <h1 className="page__title">Catalogue an ailment</h1>
        </div>
      </header>

      <AilmentForm
        action={createAilmentAction}
        submitLabel="Add ailment"
        cancelHref="/ailments"
      />
    </main>
  );
}
