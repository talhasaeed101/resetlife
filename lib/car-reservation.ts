import { SITE } from "@/lib/site";
import { openWhatsApp } from "@/lib/whatsapp";

export type CarReservationDetails = {
  carSelection: string;
  fromDate: string;
  toDate: string;
  persons: string;
  prefix: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

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

export function buildCarReservationWhatsAppUrl(details: CarReservationDetails): string {
  const fullName = [details.prefix, details.firstName, details.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const message = [
    "Hello Reset Life Farmhouse, I would like to reserve a luxury car.",
    `Car: ${details.carSelection}`,
    `From: ${formatReservationDate(details.fromDate)}`,
    `To: ${formatReservationDate(details.toDate)}`,
    `Persons: ${details.persons}`,
    `Name: ${fullName}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email}`,
  ].join("\n");

  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function submitCarReservation(details: CarReservationDetails): void {
  openWhatsApp(buildCarReservationWhatsAppUrl(details));
}
