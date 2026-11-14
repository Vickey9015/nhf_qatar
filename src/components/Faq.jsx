import { useState } from "react";
import { faqs } from "../config";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq" id="questions">
      <div className="container faq-layout">
        <header className="section-head faq-head">
          <p className="eyebrow">Before you book</p>
          <h2>Questions people ask</h2>
        </header>
        <div className="faq-list">
          {faqs.map((item, index) => {
            const expanded = open === index;
            return (
              <div className={expanded ? "faq-item open" : "faq-item"} key={item.question}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-mark" aria-hidden="true">
                    {expanded ? "–" : "+"}
                  </span>
                </button>
                {expanded ? <p>{item.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
