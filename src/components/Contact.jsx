import { company } from "../config";

const whatsappHref = `https://wa.me/${company.phoneHref.replace(/\D/g, "")}`;

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1L6.6 10.8z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l2.5 1.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10.1 10.1 0 0 0 4.65 1.12h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.86c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.4.86-.4h.62c.2 0 .46-.07.72.55.27.64.9 2.22.98 2.38.08.16.13.35.03.56-.1.22-.16.35-.31.54-.16.19-.33.42-.47.56-.16.16-.32.33-.14.64.19.32.83 1.37 1.78 2.22 1.22 1.09 2.25 1.43 2.57 1.59.32.16.5.13.69-.08.19-.22.8-.93 1.01-1.25.22-.32.43-.27.72-.16.3.1 1.87.88 2.19 1.04.32.16.53.24.61.37.08.14.08.78-.16 1.46z"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <section className="section reach" id="contact">
      <div className="container">
        <header className="reach-head">
          <h1>Contact NHF</h1>
          <p>
            Reach us by phone, WhatsApp, or email — we respond quickly and offer 24/7
            emergency service.
          </p>
        </header>
        <div className="reach-cards">
          <article className="reach-card">
            <span className="reach-icon">
              <PhoneIcon />
            </span>
            <h2>Phone</h2>
            <a href={company.phoneHref}>{company.phoneDisplay}</a>
          </article>
          <article className="reach-card">
            <span className="reach-icon">
              <MailIcon />
            </span>
            <h2>Email</h2>
            {company.emails.map((item) => (
              <a key={item.address} href={`mailto:${item.address}`}>
                {item.address}
              </a>
            ))}
          </article>
          <article className="reach-card">
            <span className="reach-icon">
              <PinIcon />
            </span>
            <h2>Address</h2>
            <p>{company.location}</p>
            <p>{company.crNumber}</p>
          </article>
          <article className="reach-card">
            <span className="reach-icon">
              <ClockIcon />
            </span>
            <h2>Hours</h2>
            <p>24/7 across Doha</p>
          </article>
        </div>

        <div className="reach-direct">
            <h2>Contact us directly</h2>
            <p>
              Call, send a WhatsApp message, or email. We will confirm a time that
              suits the property.
            </p>
            <div className="reach-actions">
              <a className="reach-btn reach-wa" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a className="reach-btn reach-call" href={company.phoneHref}>
                <PhoneIcon />
                Call now
              </a>
              <a className="reach-btn reach-mail" href={`mailto:${company.email}`}>
                <MailIcon />
                Email
              </a>
            </div>
          </div>
      </div>
    </section>
  );
}
