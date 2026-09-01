export const SITE = {
  name: "Reset Life",
  title: "Reset Life | Escape to Nature. Stay in Luxury.",
  description:
    "Relax, reconnect, and create unforgettable moments at Reset Life — a peaceful retreat surrounded by nature and tranquility.",
  email: "resetlifefarmhouse@gmail.com",
  emailMailto: "mailto:resetlifefarmhouse@gmail.com",
  whatsappNumber: "923710525188",
  whatsappDisplay: "03710525188",
  whatsappUrl:
    "https://wa.me/923710525188?text=Hello%20Reset%20Life%20Farmhouse%2C%20I%27d%20like%20to%20know%20more%20about%20availability%20and%20bookings.",
  villaDetailWhatsappUrl:
    "https://wa.me/923710525188?text=Hello%20Reset%20Life%20Farmhouse%2C%20I%27d%20like%20to%20make%20a%20reservation.",
  instagram: "https://www.instagram.com/resetlifefarmhouse/",
  instagramHandle: "@resetlife",
  instagramLabel: "resetlife",
  phone: "+921234567890",
  phoneDisplay: "+92 123 4567890",
  address:
    "Reset Life Retreat, Plot 12, Street 8, Block C, Gulberg Greens, Islamabad, Pakistan",
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

export const PREFIX_OPTIONS = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."] as const;

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

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
