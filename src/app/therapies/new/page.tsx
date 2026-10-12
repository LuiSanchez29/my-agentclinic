import Link from "next/link";
import { TherapyForm } from "../TherapyForm";
import { createTherapyAction } from "../actions";

export default function NewTherapyPage() {
  return (
    <main className="page page--narrow">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">
            <Link href="/therapies" className="link">
              Therapies
            </Link>{" "}
            / New
          </p>
          <h1 className="page__title">Add a therapy</h1>
        </div>
      </header>

      <TherapyForm
        action={createTherapyAction}
        submitLabel="Add therapy"
        cancelHref="/therapies"
      />
    </main>
  );
}
