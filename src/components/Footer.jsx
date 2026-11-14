import { company, industries, pests } from "../config";

const year = new Date().getFullYear();

const menu = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>Menu</h2>
          <ul>
            {menu.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Pest managed</h2>
          <ul>
            {pests.map((pest) => (
              <li key={pest.id}>
                <a href={`/services#residential-${pest.id}`}>{pest.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Industry</h2>
          <ul>
            {industries.map((item) => (
              <li key={item.id}>
                <a href={`/services#industry-${item.id}`}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Contact us</h2>
          <ul className="footer-contact">
            <li>{company.location}</li>
            <li>{company.crNumber}</li>
            <li>
              <a href={company.phoneHref}>{company.phoneDisplay}</a>
            </li>
            {company.emails.map((item) => (
              <li key={item.address}>
                <a href={`mailto:${item.address}`}>{item.address}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bar">
        <div className="container">
          <p>© {year} {company.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
