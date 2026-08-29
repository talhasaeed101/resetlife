import { SITE } from "@/lib/site";

export const RESERVATION_PREFILL_KEY = "resetlife-reservation-prefill";

export type ReservationPrefill = {
  guests?: string;
  checkIn?: string;
  checkOut?: string;
};

export type VillaReservationDetails = {
  fullName: string;
  phone: string;
  guests: string;
  checkIn: string;
  checkOut: string;
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

export function buildVillaWhatsAppUrl(details: VillaReservationDetails): string {
  const message = [
    "Hello Reset Life Farmhouse, I would like to reserve the villa.",
    `Name: ${details.fullName}`,
    `Phone: ${details.phone}`,
    `Guests: ${details.guests}`,
    `Check-in: ${details.checkIn}`,
    `Check-out: ${details.checkOut}`,
  ].join("\n");

  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
