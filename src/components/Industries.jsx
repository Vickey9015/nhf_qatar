import { Link } from "react-router-dom";
import { industries } from "../config";

export default function Industries() {
  return (
    <section className="section industries" id="sectors">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Shared buildings</p>
          <h2>Industries</h2>
        </header>
        <div className="industry-grid">
          {industries.map((item, index) => (
            <Link className="industry-card" id={`sector-${item.id}`} key={item.id} to={`/industries/${item.id}`}>
              <img src={item.image} alt="" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
