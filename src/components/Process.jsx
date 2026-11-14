import { process } from "../config";

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <header className="section-head">
          <h2>Process</h2>
        </header>
        <ol className="process-photos">
          {process.map((item) => (
            <li key={item.step}>
              <img src={item.image} alt="" />
              <span>
                <small>{item.step}</small>
                {item.title}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
