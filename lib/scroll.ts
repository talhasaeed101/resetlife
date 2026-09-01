import { ROUTES, type SectionId } from "@/lib/site";

export const PENDING_SECTION_KEY = "resetlife-pending-section";

export function isHomePage(pathname?: string): boolean {
  const path =
    pathname ?? (typeof window !== "undefined" ? window.location.pathname : "");

  return path === ROUTES.home;
}

export function scrollToSection(sectionId: SectionId): boolean {
  const element = document.getElementById(sectionId);
  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function storePendingSection(sectionId: SectionId): void {
  sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
}

export function readPendingSection(): SectionId | null {
  const raw = sessionStorage.getItem(PENDING_SECTION_KEY);
  if (!raw) {
    return null;
  }

  return raw as SectionId;
}

export function clearPendingSection(): void {
  sessionStorage.removeItem(PENDING_SECTION_KEY);
}

export function scrollToSectionWhenReady(
  sectionId: SectionId,
  attempt = 0,
): void {
  if (scrollToSection(sectionId) || attempt >= 24) {
    clearPendingSection();
    return;
  }

  window.setTimeout(() => scrollToSectionWhenReady(sectionId, attempt + 1), 100);
}

export function resolveSectionIdFromHash(hash: string): SectionId | null {
  const sectionId = hash.replace(/^#/, "").trim();
  return sectionId ? (sectionId as SectionId) : null;
}

export function navigateToSection(
  sectionId: SectionId,
  pathname?: string,
): void {
  if (typeof window === "undefined") {
    return;
  }

  document.body.style.overflow = "";
  document.documentElement.style.overflowX = "";

  const currentPath = pathname ?? window.location.pathname;

  if (isHomePage(currentPath)) {
    scrollToSectionWhenReady(sectionId);
    window.history.replaceState(null, "", `${ROUTES.home}#${sectionId}`);
    return;
  }

  storePendingSection(sectionId);
  window.location.href = `${ROUTES.home}#${sectionId}`;
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
