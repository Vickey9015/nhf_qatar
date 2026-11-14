import { company } from "../config";

export default function Intro() {
  return (
    <section className="home-intro">
      <div className="container">
        <h2 className="band">Pest control and disinfection in Doha</h2>
        <div className="intro-split">
          <p>
            {company.legalName} treats pests and handles surface disinfection
            for private homes, restaurants, hotels, malls, and other workplaces
            in {company.location}. Each visit starts with an inspection. The
            treatment follows the pest we find, using the method that fits that
            site. The same team covers houses and businesses.
          </p>
          <img src="/images/pest-termite.jpg" alt="Termites being treated in a wooden door frame" />
        </div>
      </div>
    </section>
  );
}
