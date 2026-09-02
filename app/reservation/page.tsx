import type { Metadata } from "next";
import ReservationContent from "@/components/ReservationContent";
import JsonLd from "@/components/seo/JsonLd";
import { reservationMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structuredData";

export const metadata: Metadata = reservationMetadata;

export default function ReservationPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reservation", path: "/reservation" },
        ])}
      />
      <ReservationContent />
    </>
  );
}
