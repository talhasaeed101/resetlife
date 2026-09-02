export const SITE = {
  name: "Reset Life Farmhouse",
  shortName: "Reset Life",
  title:
    "Reset Life Farmhouse | Luxury Farmhouse & Event Venue in Islamabad",
  description:
    "Book Reset Life Farmhouse in Gulberg Greens, Islamabad for luxury villa stays, weddings, nikkah, mehndi, birthdays, and private events. Contact us for availability and reservations.",
  email: "resetlifefarmhouse@gmail.com",
  emailMailto: "mailto:resetlifefarmhouse@gmail.com",
  whatsappNumber: "923710525188",
  whatsappDisplay: "03710525188",
  whatsappUrl:
    "https://wa.me/923710525188?text=Hello%20Reset%20Life%20Farmhouse%2C%20I%27d%20like%20to%20know%20more%20about%20availability%20and%20bookings.",
  villaDetailWhatsappUrl:
    "https://wa.me/923710525188?text=Hello%20Reset%20Life%20Farmhouse%2C%20I%27d%20like%20to%20make%20a%20reservation.",
  instagram:
    "https://www.instagram.com/resetlifefarmhouse?igsi=MXVkbWVqYmJha2Jmcg%3D%3D&utm_source=qr",
  instagramHandle: "@resetlife",
  instagramLabel: "resetlife",
  facebook: "https://www.facebook.com/share/1BiFF4Abwz/?mibextid=wwXIfr",
  tiktok:
    "https://www.tiktok.com/@reset.life.farmhouse?_r=1&_t=ZS-99LBwlkt6e2",
  phone: "+923710525188",
  phoneDisplay: "03710525188",
  address:
    "Reset Life Retreat, Plot 12, Street 8, Block C, Gulberg Greens, Islamabad, Pakistan",
  streetAddress: "Plot 12, Street 8, Block C, Gulberg Greens",
  locality: "Islamabad",
  country: "Pakistan",
  countryCode: "PK",
} as const;

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  villa: "villa",
  events: "events",
  gallery: "gallery",
  testimonial: "testimonial",
  faq: "faq",
  contact: "contact",
} as const;

export const ROUTES = {
  home: "/",
  villa: "/villa",
  reservation: "/reservation",
  carReservation: "/car-reservation",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const PAGE_NAV_LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "Villa", href: ROUTES.villa },
  { label: "Events", href: `${ROUTES.home}#${SECTION_IDS.events}` },
  { label: "Contact", href: `${ROUTES.home}#${SECTION_IDS.contact}` },
] as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_LINKS = [
  { label: "Home", sectionId: SECTION_IDS.hero },
  { label: "About", sectionId: SECTION_IDS.about },
  { label: "Villa", sectionId: SECTION_IDS.villa },
  { label: "Gallery", sectionId: SECTION_IDS.gallery },
] as const;

export const DROPDOWN_NAV_LINKS = [
  { label: "About Us", sectionId: SECTION_IDS.about },
  { label: "Our Villa", sectionId: SECTION_IDS.villa },
  { label: "Events", sectionId: SECTION_IDS.events },
  { label: "Gallery", sectionId: SECTION_IDS.gallery },
  { label: "Contact Us", sectionId: SECTION_IDS.contact },
] as const;

export const EVENT_LINKS = [
  { label: "Nikkah", eventType: "Nikkah" },
  { label: "Photography", eventType: "Photography" },
  { label: "Birthday", eventType: "Birthday" },
  { label: "Corporate Events", eventType: "Corporate Events" },
] as const;

export const EVENT_TYPES = [
  "Villa",
  "Photography",
  "Nikkah",
  "Birthday",
  "Corporate Event",
] as const;

export const GUEST_OPTIONS = [
  "1 Guest",
  "2 Guests",
  "3 Guests",
  "4 Guests",
  "5 Guests",
  "6+ Guests",
] as const;

export const PREFIX_OPTIONS = ["Mr.", "Mrs.", "Ms."] as const;

export const CAR_OPTIONS = [
  "Toyota Land Cruiser V8",
  "Premium Hatchback",
] as const;

export const PERSON_OPTIONS = [
  "1 Person",
  "2 Persons",
  "3 Persons",
  "4 Persons",
  "5+ Persons",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

const PRODUCTION_SITE_URL = "https://resetlifefarmhouse.com";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
