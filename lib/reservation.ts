import { SITE } from "@/lib/site";
import { openWhatsApp } from "@/lib/whatsapp";

export const RESERVATION_PREFILL_KEY = "resetlife-reservation-prefill";

export type ReservationPrefill = {
  eventType?: string;
  guests?: string;
  checkIn?: string;
  checkOut?: string;
};

export type VillaReservationDetails = {
  eventType: string;
  guests: string;
  checkIn: string;
  checkOut: string;
  prefix: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export function storeReservationPrefill(prefill: ReservationPrefill): void {
  sessionStorage.setItem(RESERVATION_PREFILL_KEY, JSON.stringify(prefill));
}

export function readReservationPrefill(): ReservationPrefill | null {
  const raw = sessionStorage.getItem(RESERVATION_PREFILL_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as ReservationPrefill;
  } catch {
    return null;
  }
}

export function clearReservationPrefill(): void {
  sessionStorage.removeItem(RESERVATION_PREFILL_KEY);
}

function formatReservationDate(iso: string): string {
  if (!iso) {
    return iso;
  }

  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) {
    return iso;
  }

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

export function buildVillaWhatsAppUrl(details: VillaReservationDetails): string {
  const fullName = [details.prefix, details.firstName, details.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const message = [
    "Hello Reset Life Farmhouse, I would like to make a reservation.",
    `Event: ${details.eventType}`,
    `Name: ${fullName}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email}`,
    `Guests: ${details.guests}`,
    `Check-in: ${formatReservationDate(details.checkIn)}`,
    `Check-out: ${formatReservationDate(details.checkOut)}`,
  ].join("\n");

  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function submitVillaReservation(details: VillaReservationDetails): void {
  openWhatsApp(buildVillaWhatsAppUrl(details));
}
