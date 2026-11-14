import { Link } from "react-router-dom";
import { PageBanner } from "../components/PageFrame";

export default function NotFoundPage() {
  return (
    <main>
      <PageBanner kicker="NHF Arabia" title="Page not found" text="That address is not on this site." />
      <section className="section">
        <div className="container">
          <Link className="btn btn-green" to="/">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
