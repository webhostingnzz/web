import { FAQS, PAGE_URL, PLANS, SITE_URL, HERO, SEO } from "./content";

// One JSON-LD graph for this page: Service (+ 4 Offers), FAQPage, BreadcrumbList.
// The site layout already outputs Organization and WebSite, so they are not repeated here.
// No Review or AggregateRating: the page has no reviews.
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: HERO.h1,
        description: SEO.description,
        serviceType: "Web Hosting",
        url: PAGE_URL,
        areaServed: { "@type": "Country", name: "New Zealand" },
        provider: {
          "@type": "Organization",
          name: "Webhosting NZ",
          legalName: "Bizgens Services Limited",
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/images/logo.webp`,
          telephone: "+64225476114",
          email: "info@webhosting.co.nz",
          address: {
            "@type": "PostalAddress",
            streetAddress: "243A Warwick Road, Mayfair",
            addressLocality: "Hastings",
            postalCode: "4122",
            addressCountry: "NZ",
          },
        },
        offers: PLANS.map((p) => ({
          "@type": "Offer",
          name: p.name,
          url: p.storeUrl,
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.monthly.toFixed(2),
            priceCurrency: "NZD",
            unitCode: "MON",
            valueAddedTaxIncluded: true,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Web Hosting", item: `${SITE_URL}/web-hosting/` },
          { "@type": "ListItem", position: 3, name: "Small Business Web Hosting NZ", item: PAGE_URL },
        ],
      },
    ],
  };
}
