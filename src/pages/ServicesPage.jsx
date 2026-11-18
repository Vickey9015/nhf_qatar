import { Link, useLocation, useNavigate } from "react-router-dom";
import { audiences, industryPages, pestPages } from "../catalog";
import { industries, pests } from "../config";
import { PageBanner, PageCta } from "../components/PageFrame";

const groups = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "industries", label: "Industries" },
];

const pestControl = [
  { label: "Cockroach Control", hash: "residential-cockroaches" },
  { label: "Bed Bug Treatment", hash: "residential-bed-bugs" },
  { label: "Termite Control", hash: "residential-termites" },
  { label: "Rat & Rodent Control", hash: "residential-rodents" },
  { label: "Bird Control", hash: "residential-birds" },
  { label: "Mosquito Control", hash: "residential-mosquitoes" },
  { label: "Flying Insect Control", hash: "residential-flying-insects" },
  { label: "Disinfection & Sanitization", hash: "residential-disinfection" },
  { label: "General Pest Control", hash: "residential-general" },
  { label: "Pre-Construction Termite Treatment", hash: "residential-pre-construction" },
  { label: "Pest Control Across Qatar", hash: "residential-qatar" },
  { label: "Ant Pest Control", hash: "residential-ants" },
  { label: "Flies Management", hash: "residential-flies" },
  { label: "Tick and Flea Management", hash: "residential-ticks" },
];

function groupFromHash(hash) {
  const id = hash.replace(/^#/, "");
  if (id === "commercial" || id.startsWith("commercial-")) return "commercial";
  if (id === "industries" || id.startsWith("industry-")) return "industries";
  return "residential";
}

const disinfection = {
  menu: "Disinfection & Sanitization",
  image: "/images/solution-disinfect.jpg",
  lead: "A surface treatment for rooms that need a reset. It reaches handles, desks, switches, and the gaps a cloth misses. It does not replace ordinary cleaning.",
  points: [
    "Homes, offices, clinics, and hotel rooms",
    "Booked on its own, or added to a pest visit",
    "You are told which rooms to leave, and for how long",
    "Open food, papers, and electronics are covered or moved first",
  ],
  how: "We agree the rooms first. A fine spray covers the surfaces in that list. Grease, dust, and waste still need to be cleaned. We say when people can go back in before we leave.",
};

const industryIntro = {
  lead: "Pest visits for the kinds of buildings we are asked to look after in Doha. Each one is planned around how that building actually runs.",
  points: [
    "Clinics, hotels, kitchens, stores, offices, and shops",
    "The visit follows the hours that building already keeps",
    "A written note when the site needs a record",
    "Each industry below is planned on its own",
  ],
  image: "/images/solution-business.jpg",
};

function ServiceGroup({ id, title, lead, points, image, children }) {
  return (
    <section className="service-group" id={id}>
      <h2 className="band">{title}</h2>
      <div className="intro-split">
        <div>
          <p>{lead}</p>
          <ul className="detail-list">
            {points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <img src={image} alt="" />
      </div>
      {children}
    </section>
  );
}

function PestBlocks({ prefix, note }) {
  return (
    <>
      {pests.map((pest) => {
        const page = pestPages[pest.id];
        return (
          <article className="service-entry" id={`${prefix}-${pest.id}`} key={pest.id}>
            <img src={pest.image} alt="" />
            <div>
              <h3>{pest.menu}</h3>
              <p className="service-note">{note}</p>
              <p>{page.lead}</p>
              <ul className="detail-list">
                {page.signs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{page.how}</p>
            </div>
          </article>
        );
      })}
      <article className="service-entry" id={`${prefix}-disinfection`}>
        <img src={disinfection.image} alt="" />
        <div>
          <h3>{disinfection.menu}</h3>
          <p className="service-note">{note}</p>
          <p>{disinfection.lead}</p>
          <ul className="detail-list">
            {disinfection.points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{disinfection.how}</p>
        </div>
      </article>
    </>
  );
}

export default function ServicesPage() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const active = groupFromHash(hash);
  const residential = audiences.residential;
  const commercial = audiences.commercial;

  return (
    <main>
      <PageBanner
        title="Services"
        text="Homes, workplaces, and the industries we look after in Doha. Choose a group on the left to open it."
        image="/images/hero-services.jpg"
      />
      <section className="section service-board">
        <div className="container service-layout">
          <nav className="service-side" aria-label="Service groups">
            {groups.map((item) => (
              <button
                key={item.id}
                type="button"
                className={active === item.id ? "active" : ""}
                aria-expanded={active === item.id}
                aria-controls={item.id}
                onClick={() => navigate(`/services#${item.id}`)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="service-panel">
            <nav className="pest-control-list" aria-label="Pest control">
              <h2>Pest control</h2>
              <ul>
                {pestControl.map((item) => (
                  <li key={item.hash}>
                    <Link
                      to={`/services#${item.hash}`}
                      className={hash === `#${item.hash}` ? "active" : ""}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {active === "residential" ? (
              <ServiceGroup
                id="residential"
                title="Residential"
                lead={residential.lead}
                points={residential.points}
                image={residential.image}
              >
                <PestBlocks
                  prefix="residential"
                  note="Booked around family hours, for the rooms the household uses."
                />
              </ServiceGroup>
            ) : null}
            {active === "commercial" ? (
              <ServiceGroup
                id="commercial"
                title="Commercial"
                lead={commercial.lead}
                points={commercial.points}
                image={commercial.image}
              >
                <PestBlocks
                  prefix="commercial"
                  note="Booked around service, guests, and stock so the building can stay open."
                />
              </ServiceGroup>
            ) : null}
            {active === "industries" ? (
              <ServiceGroup
                id="industries"
                title="Industries"
                lead={industryIntro.lead}
                points={industryIntro.points}
                image={industryIntro.image}
              >
                {industries.map((item) => {
                  const page = industryPages[item.id];
                  return (
                    <article className="service-entry" id={`industry-${item.id}`} key={item.id}>
                      <img src={item.image} alt="" />
                      <div>
                        <h3>{item.menu}</h3>
                        <p>{page.lead}</p>
                        <ul className="detail-list">
                          {page.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                        <p>{page.how}</p>
                      </div>
                    </article>
                  );
                })}
              </ServiceGroup>
            ) : null}
          </div>
        </div>
      </section>
      <PageCta text="Tell us whether it is a home, a workplace, or a particular industry, and what you have seen." />
    </main>
  );
}
