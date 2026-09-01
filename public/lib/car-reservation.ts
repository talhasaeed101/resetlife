import { SITE } from "@/lib/site";

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

export function buildCarReservationWhatsAppUrl(details: CarReservationDetails): string {
  const fullName = [details.prefix, details.firstName, details.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const message = [
    "Hello Reset Life Farmhouse, I would like to reserve a luxury car.",
    `Car: ${details.carSelection}`,
    `From: ${details.fromDate}`,
    `To: ${details.toDate}`,
    `Persons: ${details.persons}`,
    `Name: ${fullName}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email}`,
  ].join("\n");

  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
