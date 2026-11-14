import { useEffect } from "react";

export function PageBanner({ title, text, image = "/images/hero-home-treat.jpg" }) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | NHF Arabia`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <header className="inner-hero">
      <div className="inner-photo" style={{ backgroundImage: `url(${image})` }} />
      <div className="container inner-copy">
        <h1 className="band">{title}</h1>
        {text ? <p>{text}</p> : null}
      </div>
    </header>
  );
}

export function PageCta({ title = "Contact us", text, href = "/contact" }) {
  return (
    <section className="section about-cta">
      <div className="container about-cta-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <a className="btn btn-gold" href={href}>
          Contact us
        </a>
      </div>
    </section>
  );
}
