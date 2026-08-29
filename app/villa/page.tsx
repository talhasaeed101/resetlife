import type { Metadata } from "next";
import VillaDetailContent from "@/components/VillaDetailContent";

export const metadata: Metadata = {
  title: "Villa Details | Reset Life",
  description:
    "Explore Reset Life Farmhouse — a premium villa retreat with private pool, refined interiors, and peaceful surroundings.",
};

export default function VillaPage() {
  return <VillaDetailContent />;
}
