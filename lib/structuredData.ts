import { FAQ_ITEMS } from "@/lib/faq";
import { absoluteUrl } from "@/lib/seo";
import { getSiteUrl, SITE } from "@/lib/site";

function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "EventVenue"],
    name: SITE.name,
    url: getSiteUrl(),
    image: absoluteUrl("/Images/homePage/heroBg1.png"),
    logo: absoluteUrl("/Images/homePage/logo-icon.svg"),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.locality,
      addressCountry: SITE.countryCode,
    },
    areaServed: {
      "@type": "City",
      name: SITE.locality,
    },
    sameAs: [SITE.instagram, SITE.facebook, SITE.tiktok],
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: getSiteUrl(),
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: absoluteUrl("/Images/homePage/logo-icon.svg"),
    },
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function homeStructuredData() {
  return [businessSchema(), websiteSchema(), faqSchema()];
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
