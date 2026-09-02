import About from "@/components/About";
import CTA from "@/components/CTA";
import Events from "@/components/Events";
import LuxuryCars from "@/components/LuxuryCars";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import { SectionHashHandler } from "@/components/SectionHashHandler";
import Testimonial from "@/components/Testimonial";
import Villa from "@/components/Villa";
import JsonLd from "@/components/seo/JsonLd";
import { homeMetadata } from "@/lib/seo";
import { homeStructuredData } from "@/lib/structuredData";

export const metadata = homeMetadata;

export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <main className="min-h-screen overflow-x-hidden bg-[#050b08]">
        <SectionHashHandler />
        <Hero />
        <About />
        <Villa />
        <Events />
        <LuxuryCars />
        <Gallery />
        <Testimonial />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
