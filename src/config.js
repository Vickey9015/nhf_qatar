// Replace phone, email, and location before the site goes live.
export const company = {
  shortName: "NHF Arabia",
  legalName: "N H F Arabia Trading and Services",
  phoneDisplay: "+974 7769 9786",
  phoneHref: "tel:+97477699786",
  crNumber: "CR NO. 253779",
  email: "Info@nhfarabia.com",
  emails: [
    { label: "Info", address: "Info@nhfarabia.com" },
    { label: "Sales", address: "Sales@nhfarabia.com" },
  ],
  location: "Doha, Qatar",
  tagline: "Pest treatment and surface hygiene",
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "Instagram", href: "https://www.instagram.com/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/" },
    { name: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const pests = [
  {
    id: "cockroaches",
    name: "Cockroaches",
    menu: "Cockroach Pest Control",
    icon: "cockroach",
    image: "/images/pest-cockroach.jpg",
    blurb: "Kitchens, drains, and the gaps behind fittings.",
  },
  {
    id: "bed-bugs",
    name: "Bed bugs",
    menu: "Bed-Bugs Pest Control",
    icon: "bedbug",
    image: "/images/pest-bedbug.jpg",
    blurb: "Mattresses, headboards, and hotel guest rooms.",
  },
  {
    id: "rodents",
    name: "Rodents",
    menu: "Rodent Pest Control",
    icon: "rodent",
    image: "/images/pest-rodent.jpg",
    blurb: "Mice and rats around stores, roofs, and plant rooms.",
  },
  {
    id: "ants",
    name: "Ants",
    menu: "Ant Pest Control",
    icon: "ant",
    image: "/images/pest-ant.jpg",
    blurb: "Trails from gardens, pantries, and service yards.",
  },
  {
    id: "flies",
    name: "Flies",
    menu: "Flies Management",
    icon: "fly",
    image: "/images/pest-fly.jpg",
    blurb: "Bins, kitchens, and loading areas that attract flies.",
  },
  {
    id: "termites",
    name: "Termites",
    menu: "Termite Pest Control",
    icon: "termite",
    image: "/images/pest-termite.jpg",
    blurb: "Timber, door frames, and hidden structural damage.",
  },
  {
    id: "birds",
    name: "Birds",
    menu: "Birds Management",
    icon: "bird",
    image: "/images/pest-bird.jpg",
    blurb: "Roosting on ledges, signage, and warehouse roofs.",
  },
  {
    id: "ticks",
    name: "Ticks & fleas",
    menu: "Tick and Flea Management",
    icon: "tick",
    image: "/images/pest-flea.jpg",
    blurb: "Pets, soft furnishings, and garden edges.",
  },
  {
    id: "mosquitoes",
    name: "Mosquitoes",
    menu: "Mosquito Control",
    icon: "mosquito",
    image: "/images/pest-mosquito.jpg",
    blurb: "Standing water, gardens, and rooms left open at dusk.",
  },
  {
    id: "flying-insects",
    name: "Flying insects",
    menu: "Flying Insect Control",
    icon: "flying",
    image: "/images/pest-fly.jpg",
    blurb: "Flies, moths, and other insects that gather at lights and waste.",
  },
  {
    id: "general",
    name: "General pest control",
    menu: "General Pest Control",
    icon: "general",
    image: "/images/hero-home-treat.jpg",
    blurb: "One visit when more than one pest is using the same building.",
  },
  {
    id: "pre-construction",
    name: "Pre-construction termites",
    menu: "Pre-Construction Termite Treatment",
    icon: "foundation",
    image: "/images/pest-preconstruction.jpg",
    blurb: "Soil treatment before the slab, while the site is still open.",
  },
  {
    id: "qatar",
    name: "Pest control across Qatar",
    menu: "Pest Control Across Qatar",
    icon: "pin",
    image: "/images/hero-business-treat.jpg",
    blurb: "Visits arranged across Qatar, with Doha as the base.",
  },
];

export const solutions = [
  {
    id: "homes",
    title: "For your home",
    href: "/services#residential",
    image: "/images/solution-home.jpg",
    text: "Pest visits for houses and villas, planned around the rooms the household uses.",
    property: "House or villa",
  },
  {
    id: "premises",
    title: "For your business",
    href: "/services#commercial",
    image: "/images/solution-business.jpg",
    text: "Pest management for restaurants, hotels, offices, and other workplaces.",
    property: "Business premises",
  },
  {
    id: "hygiene",
    title: "Disinfection & sanitization",
    href: "/services#residential-disinfection",
    image: "/images/solution-disinfect.jpg",
    text: "A surface treatment for homes and workplaces, on its own or with the pest visit.",
    property: "Surface hygiene",
  },
];

export const process = [
  {
    step: "Step 1",
    title: "Inspection",
    image: "/images/pest-bedbug.jpg",
    text: "The visit starts with a close look at the site: where pests get in, where they hide, and what is drawing them.",
  },
  {
    step: "Step 2",
    title: "Consultation",
    image: "/images/pest-rodent.jpg",
    text: "We name the pest and explain the method before any work starts, so you know what will happen in each room.",
  },
  {
    step: "Step 3",
    title: "Pest treatment",
    image: "/images/pest-ant.jpg",
    text: "The treatment follows that finding. More than one method may be used when the site needs it.",
  },
];

export const plans = [
  {
    title: "A single call-out",
    text: "Use this when something has already shown up. We find the source, treat that problem, and tell you what to watch for afterwards.",
    points: ["Suited to a new sighting", "Price discussed before work starts", "A return check after treatment"],
    property: "House or villa",
    cta: "Ask for a call-out",
  },
  {
    title: "A standing schedule",
    text: "Kitchens, hotels, and shared buildings do better with repeat visits. The gap between them depends on the site, not a fixed package.",
    points: ["Early signs caught between services", "Visits booked around opening hours", "A written note after each round"],
    property: "Business premises",
    cta: "Ask about a schedule",
  },
];

export const reasons = [
  {
    title: "A look before any product",
    text: "The first job is to see the pest and the conditions drawing it in.",
  },
  {
    title: "Rooms you can use again",
    text: "We say which rooms to avoid, and when they can be used, before we leave.",
  },
  {
    title: "Timed around the building",
    text: "A family evening or a closed kitchen, rather than a visit that interrupts service.",
  },
  {
    title: "A check on a later day",
    text: "The return visit is part of the job, so you are not left guessing.",
  },
];

export const areas = [
  "West Bay",
  "The Pearl",
  "Lusail",
  "Al Sadd",
  "Al Waab",
  "Ain Khaled",
  "Industrial Area",
  "Al Wakra",
  "Al Khor",
  "Mesaieed",
];

export const faqs = [
  {
    question: "How soon can someone come?",
    answer:
      "Visits are booked inside the hours shown on this page. Same-week times are usual when the diary allows. Kitchen and guest-room problems are put first when we can move them up.",
  },
  {
    question: "Does everyone need to leave?",
    answer:
      "Often you can stay, away from the rooms being treated. For a heavy bed-bug job or a kitchen that must close, we say what needs to be empty, and for how long, before we start.",
  },
  {
    question: "How are children and food areas handled?",
    answer:
      "We tell you what will be used, which rooms to keep clear, and when those rooms can be used again. Food-prep areas are treated with that use in mind.",
  },
  {
    question: "Is one visit enough?",
    answer:
      "A single call-out suits a new problem in a home. Kitchens, hotels, and shared buildings usually do better on a repeat schedule.",
  },
  {
    question: "Can surface hygiene be booked on its own?",
    answer:
      "Yes. It can also be added to a pest visit when the space needs both.",
  },
];

export const industries = [
  {
    id: "healthcare",
    name: "Healthcare",
    menu: "Healthcare Pest Control",
    image: "/images/area-healthcare.jpg",
    text: "Clinics and care rooms that need quiet, careful visits.",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    menu: "Hospitality Pest Control",
    image: "/images/hero-sleep-treat.jpg",
    text: "Hotels and serviced apartments, including guest-room bed bugs.",
  },
  {
    id: "food",
    name: "Food & beverage",
    menu: "Food & Beverage",
    image: "/images/industry-food.jpg",
    text: "Restaurants, cafés, and kitchens where pests cannot be ignored.",
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals",
    menu: "Pharmaceuticals Pest Control",
    image: "/images/area-industrial.jpg",
    text: "Stores and production rooms that need a written, repeatable visit.",
  },
  {
    id: "offices",
    name: "IT offices",
    menu: "IT-Offices Pest Control",
    image: "/images/solution-business.jpg",
    text: "Workplaces, reception areas, and staff pantries.",
  },
  {
    id: "retail",
    name: "Retail",
    menu: "Retail Pest Control",
    image: "/images/area-retail.jpg",
    text: "Shops and malls where stock and footfall meet.",
  },
];

export const promises = [
  "Homes, kitchens, hotels, and offices",
  "The method explained before work starts",
  "Food areas and family rooms treated with care",
  "A later check included in the visit",
];

export const testimonials = [
  {
    quote:
      "They found where the cockroaches were coming from, treated the kitchen, and came back to check. The flat has stayed clear.",
    name: "Fatima A.",
    place: "Al Waab",
  },
  {
    quote:
      "We needed the restaurant treated after closing. The team was on time, explained what they used, and the morning shift opened as normal.",
    name: "James P.",
    place: "West Bay",
  },
  {
    quote:
      "Bed bugs in a guest room were dealt with the same week. Staff were discreet with our guests and the follow-up was included.",
    name: "Noor K.",
    place: "Lusail",
  },
];

export const coverageAreas = [
  {
    id: "residential",
    label: "Residential",
    href: "/services#residential",
    image: "/images/hero-home-treat.jpg",
    text: "Houses and villas, treated around the rooms the household uses.",
  },
  {
    id: "commercial",
    label: "Commercial",
    href: "/services#commercial",
    image: "/images/hero-business-treat.jpg",
    text: "Offices, shops, and other workplaces, booked around opening hours.",
  },
  {
    id: "industrial",
    label: "Industrial",
    href: "/services#industry-pharmaceuticals",
    image: "/images/area-industrial.jpg",
    text: "Warehouses and stores, including the aisles and the loading door.",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    href: "/services#industry-healthcare",
    image: "/images/area-healthcare.jpg",
    text: "Clinics and care buildings, with the visit kept to the rooms agreed.",
  },
  {
    id: "hospitality",
    label: "Hospitality",
    href: "/services#industry-hospitality",
    image: "/images/hero-sleep-treat.jpg",
    text: "Hotels and guest rooms, handled without closing the whole building.",
  },
  {
    id: "retail",
    label: "Retail",
    href: "/services#industry-retail",
    image: "/images/area-retail.jpg",
    text: "Shops and malls, with the work kept off the sales floor when it can be.",
  },
];

export const slides = [
  {
    title: "Areas we cover",
    text: "Homes, businesses, industry sites, clinics, hotels, and shops in Doha.",
    areas: coverageAreas,
  },
  ...coverageAreas.map((area) => ({
    title: area.label,
    text: area.text,
    image: area.image,
  })),
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact" },
];

export const propertyOptions = [
  "House or villa",
  "Business premises",
  "Surface hygiene",
];

export const serviceOptions = [
  "Not sure",
  ...pests.map((pest) => pest.name),
  "Surface hygiene",
];
