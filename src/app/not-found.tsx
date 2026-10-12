import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page page--narrow">
      <div className="notfound">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">Nothing here</h1>
        <p className="notfound__text">
          That page checked out of the clinic. Let&apos;s get you back.
        </p>
        <Link href="/" className="btn btn--primary">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
