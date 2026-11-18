import { createContext, useContext } from "react";
import { posts as basePosts } from "./catalog";
import { company as baseCompany } from "./config";

export function applySettings(company, settings) {
  const phoneDisplay = settings?.phoneDisplay || company.phoneDisplay;
  const digits = phoneDisplay.replace(/\D/g, "");
  const email = settings?.email || company.email;
  const salesEmail = settings?.salesEmail || company.emails?.[1]?.address || "";
  return {
    ...company,
    phoneDisplay,
    phoneHref: digits ? `tel:+${digits}` : company.phoneHref,
    email,
    emails: [
      { label: "Info", address: email },
      { label: "Sales", address: salesEmail },
    ].filter((item) => item.address),
    location: settings?.location || company.location,
    crNumber: settings?.crNumber || company.crNumber,
    topNote: settings?.topNote || "24/7 Pest Control Across Doha Qatar",
    hours: settings?.hours || "24/7 across Doha",
  };
}

export const SiteContext = createContext({
  company: applySettings(baseCompany),
  posts: basePosts,
  postsReady: false,
});

export function useSite() {
  return useContext(SiteContext);
}

export { baseCompany, basePosts };
