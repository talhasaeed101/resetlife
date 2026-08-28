export const SITE = {
  name: "Reset Life",
  title: "Reset Life | Escape to Nature. Stay in Luxury.",
  description:
    "Relax, reconnect, and create unforgettable moments at Reset Life — a peaceful retreat surrounded by nature and tranquility.",
  email: "resetlifefarmhouse@gmail.com",
  emailMailto: "mailto:resetlifefarmhouse@gmail.com",
  whatsappNumber: "923145156162",
  whatsappDisplay: "03145156162",
  whatsappUrl:
    "https://wa.me/923145156162?text=Hello%20Reset%20Life%20Farmhouse%2C%20I%27d%20like%20to%20know%20more%20about%20availability%20and%20bookings.",
  instagram: "https://www.instagram.com/resetlifefarmhouse/",
  instagramHandle: "@resetlifefarmhouse",
  instagramLabel: "Reset Life Farmhouse",
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

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_LINKS = [
  { label: "Home", sectionId: SECTION_IDS.hero },
  { label: "About", sectionId: SECTION_IDS.about },
  { label: "Villa", sectionId: SECTION_IDS.villa },
  { label: "Gallery", sectionId: SECTION_IDS.gallery },
] as const;

export const EVENT_LINKS = [
  { label: "Nikkah", eventType: "Nikkah" },
  { label: "Photography", eventType: "Photography" },
  { label: "Birthday", eventType: "Birthday" },
  { label: "Corporate Events", eventType: "Corporate Events" },
] as const;

export const EVENT_TYPES = [
  "Photography",
  "Nikkah",
  "Birthday",
  "Corporate Events",
  "Villa Stay",
  "Other",
] as const;

export const GUEST_OPTIONS = [
  "1 Guest",
  "2 Guests",
  "3 Guests",
  "4 Guests",
  "5 Guests",
  "6+ Guests",
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
