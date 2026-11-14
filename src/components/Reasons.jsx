import { reasons } from "../config";

export default function Reasons() {
  return (
    <section className="section reasons" id="reasons">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">The way we work</p>
          <h2>What you can expect</h2>
        </header>
        <div className="reason-grid">
          {reasons.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
