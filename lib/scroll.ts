import type { SectionId } from "@/lib/site";

export function scrollToSection(sectionId: SectionId): void {
  const element = document.getElementById(sectionId);
  if (!element) {
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const BOOKING_PREFILL_KEY = "resetlife-booking-prefill";

export const BOOKING_PREFILL_EVENT = "resetlife:booking-prefill";

export type BookingPrefill = {
  eventType?: string;
  guests?: string;
  checkIn?: string;
  checkOut?: string;
  message?: string;
};

export function storeBookingPrefill(prefill: BookingPrefill): void {
  sessionStorage.setItem(BOOKING_PREFILL_KEY, JSON.stringify(prefill));
}

export function readBookingPrefill(): BookingPrefill | null {
  const raw = sessionStorage.getItem(BOOKING_PREFILL_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as BookingPrefill;
  } catch {
    return null;
  }
}

export function clearBookingPrefill(): void {
  sessionStorage.removeItem(BOOKING_PREFILL_KEY);
}

export function dispatchBookingPrefill(): void {
  window.dispatchEvent(new Event(BOOKING_PREFILL_EVENT));
}
