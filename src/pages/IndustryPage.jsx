import { Link, useParams } from "react-router-dom";
import { industryPages } from "../catalog";
import { industries } from "../config";
import { PageBanner, PageCta } from "../components/PageFrame";
import NotFoundPage from "./NotFoundPage";

export default function IndustryPage() {
  const { id } = useParams();
  const page = industryPages[id];
  const industry = industries.find((item) => item.id === id);

  if (!page || !industry) return <NotFoundPage />;

  return (
    <main>
      <PageBanner
        kicker="Industries"
        title={page.title}
        text={page.lead}
        image={industry.image}
      />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-copy">
            <div className="media-split">
              <img src={industry.image} alt="" />
              <div>
                <h2>What you can expect</h2>
                <p>{industry.text}</p>
              </div>
            </div>
            <ul className="detail-list">
              {page.points.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2>How the programme runs</h2>
            <p>{page.how}</p>
          </div>
          <aside className="detail-aside">
            <h2>Other industries</h2>
            <ul className="detail-list">
              {industries
                .filter((item) => item.id !== industry.id)
                .map((item) => (
                  <li key={item.id}>
                    <Link to={`/industries/${item.id}`}>{item.menu}</Link>
                  </li>
                ))}
            </ul>
            <Link className="btn btn-gold" to="/contact?property=Business%20premises">
              Ask for a visit
            </Link>
          </aside>
        </div>
      </section>
      <PageCta
        text="Tell us the building and the pest, if you know it."
        href="/contact?property=Business%20premises"
      />
    </main>
  );
}
