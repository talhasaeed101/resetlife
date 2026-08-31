import type { Metadata } from "next";
import CarReservationContent from "@/components/CarReservationContent";

export const metadata: Metadata = {
  title: "Car Reservation | Reset Life",
  description:
    "Reserve a premium chauffeur-driven luxury car for your stay at Reset Life Farmhouse.",
};

export default function CarReservationPage() {
  return <CarReservationContent />;
}
