import { company } from "../config";

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="inner-photo" style={{ backgroundImage: "url(/images/hero-about.jpg)" }} />
      <section className="section about-story">
        <div className="container">
          <h1 className="band">About us</h1>
          <div className="intro-split">
            <div>
              <p>
                {company.legalName} looks after homes and businesses in{" "}
                {company.location} that need pests dealt with carefully. The
                visit starts with an inspection, the pest is named, and the
                treatment follows that finding.
              </p>
              <p>
                The same team covers private houses and workplaces. A kitchen
                can be treated after service. A guest room can be handled
                without closing the whole building. Disinfection can be booked
                on its own, or added to the pest visit.
              </p>
            </div>
            <img src="/images/hero-home-treat.jpg" alt="Cockroaches being treated in a living room" />
          </div>
          <div className="mission-grid">
            <article>
              <h2 className="band">Our mission</h2>
              <p>
                Help homes and workplaces in Doha stay clearer of pests, with a
                visit that is explained before the work starts.
              </p>
            </article>
            <article>
              <h2 className="band">Our vision</h2>
              <p>
                Be a pest and disinfection team that properties in Qatar can
                call again, because the work is careful and the follow-up is
                included.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
