import { Link } from "react-router-dom";
import { pests } from "../config";
import Icon from "./Icons";

export default function Pests() {
  return (
    <section className="pest-manage" id="pests">
      <div className="container">
        <h2>Pests to manage</h2>
        <div className="pest-manage-row">
          {pests.map((pest) => (
            <Link key={pest.id} to={`/services#residential-${pest.id}`} id={`pest-${pest.id}`}>
              <span className="pest-bubble">
                <Icon name={pest.icon} />
              </span>
              <strong>{pest.name}</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
