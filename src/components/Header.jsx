import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { nav } from "../config";
import { useSite } from "../site-context";

function SocialIcon({ name }) {
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#ig-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <defs>
          <linearGradient id="ig-brand" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f9ce34" />
            <stop offset="0.45" stopColor="#ee2a7b" />
            <stop offset="1" stopColor="#6228d7" />
          </linearGradient>
        </defs>
        <path d="M7.7 4h8.6A3.7 3.7 0 0120 7.7v8.6a3.7 3.7 0 01-3.7 3.7H7.7A3.7 3.7 0 014 16.3V7.7A3.7 3.7 0 017.7 4z" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M15.12 8.16h-2.03V6.83c0-.5.33-.62.56-.62h1.43V4.02L13.1 4c-2.2 0-2.7 1.65-2.7 2.7v1.46H8.98v2.26h1.42V17h2.69v-6.58h1.81l.22-2.26z" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.95H4.5V17h2.44V8.95zM5.72 5a1.41 1.41 0 100 2.82 1.41 1.41 0 000-2.82zm5.13 3.95H8.51V17h2.44v-3.98c0-1.05.2-2.06 1.5-2.06 1.27 0 1.29 1.19 1.29 2.12V17h2.44v-4.42c0-2.17-.47-3.84-3-3.84-1.22 0-2.03.67-2.37 1.3h.04V8.95z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 8.2a2.35 2.35 0 00-1.65-1.66C16.5 6.15 12 6.15 12 6.15s-4.5 0-5.95.39A2.35 2.35 0 004.4 8.2 24.46 24.46 0 004 12a24.46 24.46 0 00.4 3.8 2.35 2.35 0 001.65 1.66c1.45.39 5.95.39 5.95.39s4.5 0 5.95-.39a2.35 2.35 0 001.65-1.66A24.46 24.46 0 0020 12a24.46 24.46 0 00-.4-3.8zM10.4 14.65v-5.3L15 12l-4.6 2.65z" />
    </svg>
  );
}

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

function MenuLink({ href, className, children, onClick, end }) {
  if (href.includes("#")) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <NavLink
      className={({ isActive }) =>
        [className, isActive ? "active" : ""].filter(Boolean).join(" ")
      }
      to={href}
      end={end}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  const { company } = useSite();
  const [open, setOpen] = useState(false);
  const [dropped, setDropped] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setDropped(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setDropped(null);
  }, [pathname]);

  useEffect(() => {
    if (!dropped) return undefined;
    const onPointer = (event) => {
      if (!(event.target instanceof Element) || !event.target.closest(".nav-item")) {
        setDropped(null);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [dropped]);

  const close = () => {
    setOpen(false);
    setDropped(null);
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.closest(".site-header")) {
      active.blur();
    }
  };

  return (
    <header className="site-header" id="top">
      <div className="topbar">
        <div className="container topbar-inner">
          <p className="topbar-note">{company.topNote}</p>
          <div className="topbar-contacts">
            <p className="topbar-phone">
              <span className="topbar-label">Booking &amp; Enquiry:</span>
              <PhoneIcon />
              <a href={company.phoneHref}>{company.phoneDisplay}</a>
            </p>
            <p className="topbar-mail">
              <span className="topbar-label">Email us</span>
              <MailIcon />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </div>
          <div className="topbar-social">
            {company.socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-${item.name.toLowerCase()}`}
                aria-label={item.name}
              >
                <SocialIcon name={item.name} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="container navbar-inner">
          <MenuLink className="brand" href="/" onClick={close} end>
            <img src="/logo.png" alt="NHF Arabia Trading and Services" />
          </MenuLink>

          <nav className={open ? "nav open" : "nav"} aria-label="Primary">
            {nav.map((item) =>
              item.children ? (
                <div
                  className={[
                    "nav-item",
                    dropped === item.label ? "open" : "",
                    pathname === item.href ||
                    (item.href === "/industries" && pathname.startsWith("/industries/"))
                      ? "active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={item.label}
                >
                  <button
                    type="button"
                    className="nav-parent"
                    aria-expanded={dropped === item.label}
                    onClick={() =>
                      setDropped((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <span className="chevron" aria-hidden="true" />
                  </button>
                  <div className="dropdown">
                    <MenuLink href={item.href} onClick={close}>
                      {item.label}
                    </MenuLink>
                    {item.children.map((child) => (
                      <MenuLink key={child.href} href={child.href} onClick={close}>
                        {child.label}
                      </MenuLink>
                    ))}
                  </div>
                </div>
              ) : (
                <MenuLink key={item.label} href={item.href} onClick={close} end={item.href === "/"}>
                  {item.label}
                </MenuLink>
              ),
            )}
          </nav>

          <button
            type="button"
            className={open ? "menu-toggle open" : "menu-toggle"}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className="header-stripe" />
    </header>
  );
}
