import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Reset Life",
  description: "Privacy Policy for Reset Life.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-4 font-['Raleway'] text-[16px] leading-relaxed text-[#8e8e8e]">
          <p>
            {SITE.name} respects your privacy. This page outlines how personal
            information submitted through our website contact and booking forms
            may be collected and used to respond to your inquiries.
          </p>
          <p>
            Information you submit may include your name, email address, phone
            number, booking details, and message content. We use this information
            only to communicate with you about your request.
          </p>
          <p>
            For privacy-related questions, contact us at{" "}
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
