import { Link, useParams } from "react-router-dom";
import { pestPages } from "../catalog";
import { pests } from "../config";
import { PageBanner, PageCta } from "../components/PageFrame";
import NotFoundPage from "./NotFoundPage";

export default function PestPage() {
  const { id } = useParams();
  const page = pestPages[id];
  const pest = pests.find((item) => item.id === id);

  if (!page || !pest) return <NotFoundPage />;

  return (
    <main>
      <PageBanner kicker={page.kicker} title={page.title} text={page.lead} image={pest.image} />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-copy">
            <div className="media-split">
              <img src={pest.image} alt="" />
              <div>
                <h2>{page.signsTitle}</h2>
                <p>{page.signsIntro}</p>
              </div>
            </div>
            <ul className="detail-list">
              {page.signs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2>{page.placesTitle}</h2>
            <p>{page.placesIntro}</p>
            <ul className="detail-list">
              {page.places.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className="detail-aside">
            <h2>Why book this visit</h2>
            <ul className="detail-list">
              {page.reasons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2>How the visit works</h2>
            <p>{page.how}</p>
            <Link className="btn btn-gold" to={`/contact?service=${encodeURIComponent(pest.name)}`}>
              Ask for a visit
            </Link>
          </aside>
        </div>
      </section>
      <section className="section about-work">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Other pests</p>
            <h2>The rest of the list</h2>
          </header>
          <div className="pest-grid">
            {pests
              .filter((item) => item.id !== pest.id)
              .map((item) => (
                <Link className="pest-card" key={item.id} to={`/pests/${item.id}`}>
                  <img src={item.image} alt="" />
                  <h3>{item.menu}</h3>
                  <p>{item.blurb}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <PageCta
        text="Call or send a note with the pest, if you know it. We will confirm a time that suits the property."
        href={`/contact?service=${encodeURIComponent(pest.name)}`}
      />
    </main>
  );
}
