// All copy, prices and links for /small-business-web-hosting-nz/ live here.
// When a plan price changes, change it in PLANS only: the title, meta description,
// table, plan picker, FAQ text and JSON-LD are all built from this file.

export const SITE_URL = "https://webhosting.co.nz";
export const PAGE_PATH = "/small-business-web-hosting-nz/";
export const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const PHONE_DISPLAY = "+64 022 547 6114";
export const PHONE_TEL = "tel:+64225476114";
export const EMAIL = "info@webhosting.co.nz";

export type Plan = {
  name: string;
  websites: string;
  storage: string;
  email: string;
  monthly: number;
  storeUrl: string;
  pickerText: string;
};

export const PLANS: Plan[] = [
  {
    name: "Essentials",
    websites: "1",
    storage: "10GB",
    email: "Unlimited 10GB mailboxes",
    monthly: 4.49,
    storeUrl: "https://my.webhosting.co.nz/store/web-hosting/essentials",
    pickerText:
      "The right choice for a business with one website: a tradie, a café, a local shop or a consultancy.",
  },
  {
    name: "Growth",
    websites: "5",
    storage: "Unlimited",
    email: "Unlimited 10GB mailboxes",
    monthly: 7.49,
    storeUrl: "https://my.webhosting.co.nz/store/web-hosting/growth",
    pickerText:
      "For a business with a second brand, a separate booking site or a landing page for a promotion.",
  },
  {
    name: "Premium",
    websites: "10",
    storage: "Unlimited",
    email: "Unlimited 10GB mailboxes",
    monthly: 9.49,
    storeUrl: "https://my.webhosting.co.nz/store/web-hosting/premium",
    pickerText:
      "For owners who run several businesses or locations, each with its own site.",
  },
  {
    name: "Elite",
    websites: "Unlimited",
    storage: "Unlimited",
    email: "Unlimited 10GB mailboxes",
    monthly: 14.49,
    storeUrl: "https://my.webhosting.co.nz/store/web-hosting/elite",
    pickerText:
      "For anyone looking after lots of sites, such as a local web designer hosting client websites.",
  },
];

// .co.nz, .nz and .kiwi.nz are $33.00 when bought together with a hosting plan,
// $36.99 on their own (owner's pricing rule).
export const DOMAIN_CO_NZ_YEARLY = 33.0;
export const DOMAIN_CO_NZ_STANDALONE = 36.99;
export const WORDPRESS_FROM = 5.99;
export const BUSINESS_EMAIL_FROM = 3.99;

export const money = (n: number) => `$${n.toFixed(2)}`;
export const yearly = (monthly: number) => Math.round(monthly * 12 * 100) / 100;

const essentials = PLANS[0];

// Title and description are built from the Essentials price, so a price change updates them too.
export const SEO = {
  title: `Small Business Web Hosting NZ | ${money(essentials.monthly)}/mo GST Incl`,
  description: `Small business web hosting in NZ from ${money(essentials.monthly)}/month, GST included. Same price at renewal, free migration with no downtime, 24/7 support. 100% NZ owned.`,
  ogImage: `${SITE_URL}/images/hero/small-business-hosting.webp`,
};
export const FIRST_YEAR_BUNDLE =
  Math.round((DOMAIN_CO_NZ_YEARLY + yearly(essentials.monthly)) * 100) / 100;

// If the project enables typedRoutes, change the closing line of LINKS to:
//   } as const satisfies Record<string, import("next").Route>;
export const LINKS = {
  plans: "/web-hosting/",
  wordpress: "/wordpress-hosting/",
  domain: "/domain/",
  email: "/business-email-hosting/",
  contact: "/contact/",
  costGuide: "/web-hosting-cost-nz/",
  migrationGuide: "/migrate-website-to-new-host-nz/",
  domainRenewals: "/domain-name-costs-renewal-prices-nz/",
  hostingTypes: "/vps-vs-cloud-vs-shared-hosting-nz/",
};

export const HERO = {
  h1: "Small Business Web Hosting NZ",
  intro: `Small business web hosting in NZ starts at ${money(essentials.monthly)} a month with webhosting.co.nz, GST included, and renews at the same price. Every plan includes free SSL, a global CDN, DDoS protection, malware scans, backups and free migration from your current host, plus 24/7/365 support and a 99.99% uptime guarantee.`,
  sub: "You get a fast, secure website and email on your own domain, without learning how servers work.",
  bullets: [
    { strong: `${money(essentials.monthly)} a month, GST included.`, text: "The price on the plan is the price you pay." },
    { strong: "Same price at renewal.", text: "No cheap first year that jumps in year two." },
    { strong: "Free migration with no downtime.", text: "We move your website, database and email for you." },
    { strong: "24/7/365 support.", text: "Live chat around the clock." },
    { strong: "30-day money back guarantee.", text: "If hosting is not right for you, ask for your money back within 30 days." },
    { strong: "100% New Zealand owned and operated.", text: "Run by our team in Hastings." },
  ],
  cta: "See the plans and get started",
  callPrompt: "Prefer to talk first? Call",
};

export const PLAN_TABLE = {
  h2: "Small business hosting plans and prices",
  note: "All prices are in New Zealand dollars and include GST.",
  after:
    "Every plan has the same security and speed features, unlimited bandwidth and unlimited mailboxes. Only the number of websites and storage differ: Essentials has 10GB, plenty for a typical small business site. Full details are on",
  afterLink: "our web hosting plans page",
};

export const PICKER = {
  h2: "Which plan is right for your business?",
  wordpressLead: "Building your site in WordPress?",
  wordpressLink: `WordPress hosting starts at ${money(WORDPRESS_FROM)} a month`,
  wordpressTail: "and adds StackCache for speed, a staging site for testing changes, and 24/7 WordPress support.",
  growLead:
    "Not sure? Start on Essentials and move up as your business grows. If you later need dedicated resources for a busy online store or custom software, our guide to",
  growLink: "shared, VPS and cloud hosting for NZ businesses",
  growTail: "explains the next step.",
};

export const COMPARE = {
  h2: "What to check before you compare hosts",
  lead: "Three things change what you really pay, and all three are easy to miss.",
  items: [
    {
      q: "Is GST included?",
      a: "Some NZ hosts show prices without GST and add 15% at checkout. A plan advertised at $10.00 a month costs $11.50 once GST is added. Every price on our site already includes GST.",
    },
    {
      q: "What does it renew at?",
      a: "Some hosts offer a cheap first year and charge more from year two. Our hosting renews at the advertised plan price.",
    },
    {
      q: "What is actually included?",
      a: "A low price can leave out SSL, backups or help moving your site. Every one of our plans includes all three, free.",
    },
  ],
  tailLead: "For the full picture, including domains and email, read our guide to",
  tailLink: "what web hosting costs in NZ",
};

export const INCLUDED = {
  h2: "What every plan includes",
  rows: [
    ["Free SSL certificate", "Shows the padlock. Without it, Chrome warns visitors your site is not secure."],
    ["Free global premium CDN", "Keeps copies of your pages on servers around the world, so they load quickly for your visitors."],
    ["1 Tbps+ DDoS protection", "Blocks floods of junk traffic aimed at taking your site offline."],
    ["Free automatic malware scans", "Checks your files for harmful code, so problems are caught early."],
    ["On-demand backup", "Save a copy of your site before you make changes, and restore it if something goes wrong."],
    ["Free website builder", "Build pages with drag and drop, no coding needed."],
    ["80+ one-click apps", "Install WordPress, WooCommerce and more from a menu."],
    ["99.99% uptime guarantee", "We guarantee your site is online 99.99% of the time, so customers can reach you when they need you."],
    ["Free migration", "We move your existing site and email across for you."],
  ] as [string, string][],
};

export const MIGRATION = {
  h2: "Switch hosts without breaking your website or email",
  lead: "Moving hosts is the part most owners worry about, so we do it for you, free, with no downtime:",
  steps: [
    "Ask for a free migration when you sign up.",
    "We copy your website files, database and email.",
    "We build your site on a staging URL, a private test address.",
    "We check that everything works on the staging URL before anything changes.",
    "Only then do we switch your nameservers. Your site stays live on your old host until the switch, so there is no downtime. Keep your old hosting account open for a few days afterwards while the change reaches every network.",
  ],
  timeLead: "Most migrations are finished in 4 to 12 hours. Our",
  timeLink: "step-by-step guide to moving your website to a new host",
  timeTail: "explains what we need from you.",
  cta: "Choose a plan and request your free migration",
};

export const SUPPORT = {
  h2: "Support from a 100% NZ-owned company",
  p1: "webhosting.co.nz is run by Bizgens Services Limited, 243A Warwick Road, Mayfair, Hastings. We are 100% New Zealand owned and operated, and you are billed in NZ dollars.",
  p2Lead: "Live chat is open 24/7/365, or you can call",
  p2Mid: "or email",
  p3: "Our servers are located in Singapore, with hosting optimised for New Zealand customers. Every plan runs behind a free global premium CDN so your pages load quickly, backed by our 99.99% uptime guarantee.",
};

export const DOMAINS = {
  h2: "Add a domain and business email",
  p1Lead: "Buy a .co.nz, .nz or .kiwi.nz domain together with your hosting plan and it costs",
  p1Link: `${money(DOMAIN_CO_NZ_YEARLY)} a year`,
  p1Tail: `instead of ${money(DOMAIN_CO_NZ_STANDALONE)} on its own. Every domain comes with a free 10GB mailbox when bought together with any of our hosting plans. Full DNS control and renewal reminders are included with every domain.`,
  p2Lead:
    "Every hosting plan already includes unlimited 10GB mailboxes on your own domain, so you can use you@yourbusiness.co.nz instead of a Gmail address. To run email as a separate service, with up to 25GB per mailbox,",
  p2Link: `business email hosting starts at ${money(BUSINESS_EMAIL_FROM)} a month`,
  p3Lead: "A .co.nz domain bought with the Essentials plan costs",
  p3Strong: `${money(FIRST_YEAR_BUNDLE)} for your first year`,
  p3Mid: `(${money(DOMAIN_CO_NZ_YEARLY)} + ${money(yearly(essentials.monthly))}), GST included. See`,
  p3Link: "how .co.nz renewal prices compare across NZ registrars",
};

// FAQ text is used twice: on the page and in FAQPage JSON-LD.
// Keep it identical. Do not add questions to the schema that are not on the page.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much does web hosting cost for a small business in NZ?",
    a: `With us, small business web hosting costs ${money(essentials.monthly)} a month, or ${money(yearly(essentials.monthly))} a year, GST included. When comparing hosts, check whether the price includes GST, because some NZ hosts add 15% at checkout. You will also need a domain name, and business email starts from ${money(BUSINESS_EMAIL_FROM)} a month if you want it as a separate service.`,
  },
  {
    q: "Which web hosting is best for small businesses?",
    a: `For most small businesses, shared hosting is the right fit. It runs a brochure site, booking form or small online store without you managing a server. Choose a plan that includes SSL, backups and a CDN free, shows its price with GST, and renews at the same price. Our Essentials plan at ${money(essentials.monthly)} a month does all four.`,
  },
  {
    q: "Will moving my website to you cause downtime or break my email?",
    a: "No. Migration is free and we do it for you. We copy your files, database and email, build your site on a staging URL and check it works before your nameservers are switched. Your site stays live on your old host until the switch, so there is no downtime. Most moves take 4 to 12 hours.",
  },
  {
    q: "What is the cheapest web hosting in NZ for a small business?",
    a: `Our Essentials plan is ${money(essentials.monthly)} a month with GST included, and it renews at the same price. When comparing other NZ hosts, check two things: whether their price includes GST, and what it renews at. A price with 15% GST still to add, or a cheap first year that jumps at renewal, often costs more over three years.`,
  },
];

export const CLOSING = {
  h2: `Get your business online for ${money(essentials.monthly)} a month`,
  p: "Pick a plan today and we will move your current site across for free. Every plan comes with 24/7/365 support and a 30-day money back guarantee.",
  cta: "Choose your hosting plan",
  talkLead: "Want to talk it through first? Call our Hastings team on",
  talkMid: "or",
  talkLink: "send us a question",
};
