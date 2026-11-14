import { Link } from "react-router-dom";
import { audiences } from "../catalog";
import { pests } from "../config";
import { PageBanner, PageCta } from "../components/PageFrame";

export default function AudiencePage({ kind }) {
  const page = audiences[kind];
  const property = kind === "commercial" ? "Business premises" : "House or villa";

  return (
    <main>
      <PageBanner kicker={page.kicker} title={page.title} text={page.lead} image={page.image} />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-copy">
            <h2>What the visit covers</h2>
            <p>
              Choose the pest below, or tell us you are not sure. The same team
              handles a single call-out and a repeat schedule.
            </p>
            <ul className="detail-list">
              {page.points.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className="detail-aside">
            <h2>Book this kind of visit</h2>
            <p>Say whether it is a house or a workplace, and what you have seen.</p>
            <Link className="btn btn-gold" to={`/contact?property=${encodeURIComponent(property)}`}>
              Ask for a visit
            </Link>
          </aside>
        </div>
      </section>
      <section className="section about-work">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Services</p>
            <h2>Pests and disinfection</h2>
          </header>
          <div className="pest-grid">
            {pests.map((pest) => (
              <Link className="pest-card" key={pest.id} to={`/pests/${pest.id}`}>
                <img src={pest.image} alt="" />
                <h3>{pest.menu}</h3>
                <p>{pest.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PageCta
        text="Tell us the area in Doha and the pest, if you know it."
        href={`/contact?property=${encodeURIComponent(property)}`}
      />
    </main>
  );
}
