import type { Metadata } from "next";
import CarReservationContent from "@/components/CarReservationContent";
import JsonLd from "@/components/seo/JsonLd";
import { carReservationMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structuredData";

export const metadata: Metadata = carReservationMetadata;

export default function CarReservationPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Car Reservation", path: "/car-reservation" },
        ])}
      />
      <CarReservationContent />
    </>
  );
}
