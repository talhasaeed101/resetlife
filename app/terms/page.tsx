import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Reset Life",
  description: "Terms of Service for Reset Life.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[800px]">
        <Link
          href="/"
          className="font-['Raleway'] text-[14px] text-[#8e8e8e] transition-colors hover:text-white"
        >
          Back to homepage
        </Link>
        <h1 className="mt-8 font-['dtnightingale'] text-[40px] font-light text-white">
          Terms of Service
        </h1>
        <div className="mt-8 space-y-4 font-['Raleway'] text-[16px] leading-relaxed text-[#8e8e8e]">
          <p>
            By using the {SITE.name} website, you agree to use the site for
            lawful purposes and to provide accurate information when submitting
            booking or contact requests.
          </p>
          <p>
            Website content, imagery, and branding are provided for informational
            purposes. Availability, pricing, and event arrangements are subject
            to confirmation by {SITE.name}.
          </p>
          <p>
            For questions about these terms, contact us at{" "}
            <a href={`mailto:${SITE.email}`} className="text-white">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
