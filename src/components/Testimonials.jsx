import { useState } from "react";
import { testimonials } from "../config";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="band">Testimonials</h2>
        <p className="quote-kicker">What our clients say</p>
        <blockquote>
          <p>“{item.quote}”</p>
          <footer>
            — {item.name}, {item.place}
          </footer>
        </blockquote>
        <div className="quote-dots">
          {testimonials.map((quote, quoteIndex) => (
            <button
              key={quote.name}
              type="button"
              className={quoteIndex === index ? "active" : ""}
              aria-label={`Show quote from ${quote.name}`}
              onClick={() => setIndex(quoteIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
