import { Link } from "react-router-dom";
import { solutions } from "../config";

export default function Solutions() {
  return (
    <section className="section solutions" id="solutions">
      <div className="container">
        <header className="section-head">
          <h2>Solutions</h2>
        </header>
        <div className="solution-grid">
          {solutions.map((item) => (
            <Link
              className="solution-card"
              id={item.id}
              key={item.id}
              to={item.href}
            >
              <img src={item.image} alt="" />
              <span className="solution-shade" />
              {item.badge ? <span className="solution-badge">{item.badge}</span> : null}
              <span className="solution-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
