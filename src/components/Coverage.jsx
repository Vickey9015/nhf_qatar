import { areas } from "../config";

export default function Coverage() {
  return (
    <section className="section coverage" id="coverage">
      <div className="container coverage-inner">
        <div>
          <p className="eyebrow light">Around Doha</p>
          <h2>Places we travel to</h2>
          <p>
            Visits are booked across Doha and nearby towns. If your area is not
            listed, ask anyway.
          </p>
        </div>
        <ul className="area-list">
          {areas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
