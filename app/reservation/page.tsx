import type { Metadata } from "next";
import ReservationContent from "@/components/ReservationContent";

export const metadata: Metadata = {
  title: "Reservation | Reset Life",
  description:
    "Reserve your stay at Reset Life Farmhouse and confirm your booking on WhatsApp.",
};

export default function ReservationPage() {
  return <ReservationContent />;
}
