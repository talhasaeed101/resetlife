import type { Metadata } from "next";
import VillaDetailContent from "@/components/VillaDetailContent";
import JsonLd from "@/components/seo/JsonLd";
import { villaMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structuredData";

export const metadata: Metadata = villaMetadata;

export default function VillaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Villa", path: "/villa" },
        ])}
      />
      <VillaDetailContent />
    </>
  );
}
