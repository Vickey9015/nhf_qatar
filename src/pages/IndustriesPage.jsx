import { Link } from "react-router-dom";
import { industries } from "../config";
import { PageBanner, PageCta } from "../components/PageFrame";

export default function IndustriesPage() {
  return (
    <main>
      <PageBanner
        kicker="Shared buildings"
        title="Industries"
        image="/images/solution-business.jpg"
        text="Pest visits for the kinds of buildings we are asked to look after in Doha. Each one is planned around how that building actually runs."
      />
      <section className="section">
        <div className="container">
          <div className="pest-grid">
            {industries.map((item) => (
              <Link className="pest-card" key={item.id} to={`/industries/${item.id}`}>
                <img src={item.image} alt="" />
                <h3>{item.menu}</h3>
                <p>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PageCta text="Tell us the type of building and what you have seen." href="/contact?property=Business%20premises" />
    </main>
  );
}
