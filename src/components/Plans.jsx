import { plans } from "../config";

function choosePlan(property) {
  window.dispatchEvent(
    new CustomEvent("nhf-enquiry", { detail: { property } }),
  );
}

export default function Plans() {
  return (
    <section className="section plans" id="plans">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">How you can book</p>
          <h2>One visit, or a standing schedule</h2>
        </header>
        <div className="plan-grid">
          {plans.map((plan) => (
            <article key={plan.title}>
              <h3>{plan.title}</h3>
              <p>{plan.text}</p>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a
                className="btn btn-green"
                href="#contact"
                onClick={() => choosePlan(plan.property)}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
