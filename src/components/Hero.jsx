import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slides } from "../config";
import { useSite } from "../site-context";

export default function Hero() {
  const { company } = useSite();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  const slide = slides[index];

  const go = (next) => {
    setIndex((next + slides.length) % slides.length);
  };

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((item, slideIndex) =>
        item.areas ? (
          <div
            key={item.title}
            className={slideIndex === index ? "hero-mosaic active" : "hero-mosaic"}
            inert={slideIndex === index ? undefined : true}
          >
            {item.areas.map((area) => (
              <Link key={area.id} className="hero-tile" to={area.href}>
                <img src={area.image} alt="" />
                <span>{area.label}</span>
              </Link>
            ))}
          </div>
        ) : (
          <img
            key={item.image}
            className={slideIndex === index ? "hero-image active" : "hero-image"}
            src={item.image}
            alt=""
            fetchPriority={slideIndex === 0 ? "high" : "auto"}
          />
        ),
      )}
      <div className="hero-shade" />

      <div className="container hero-inner">
        {slide.areas ? null : (
          <div className="hero-copy" key={slide.title}>
            <h1>{slide.title}</h1>
            <p className="hero-text">{slide.text}</p>
          </div>
        )}

        <aside className="booking-card">
          <p className="booking-label">Booking</p>
          <a className="booking-value" href={company.phoneHref}>
            {company.phoneDisplay}
          </a>
          <p className="booking-caption">Email us</p>
          {company.emails.map((item) => (
            <a className="booking-mail" href={`mailto:${item.address}`} key={item.address}>
              {item.address}
            </a>
          ))}
        </aside>
      </div>

      <button type="button" className="hero-arrow hero-arrow-prev" onClick={() => go(index - 1)} aria-label="Previous slide">
        <span aria-hidden="true">‹</span>
      </button>
      <button type="button" className="hero-arrow hero-arrow-next" onClick={() => go(index + 1)} aria-label="Next slide">
        <span aria-hidden="true">›</span>
      </button>
      <div className="hero-controls">
        <div className="hero-dots">
          {slides.map((item, slideIndex) => (
            <button
              key={item.title}
              type="button"
              className={slideIndex === index ? "dot active" : "dot"}
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? "true" : undefined}
              onClick={() => setIndex(slideIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
