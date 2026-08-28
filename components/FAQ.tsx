"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqItem = {
  question: string;
  answer?: string;
};

const faqItems: FaqItem[] = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Yes, we offer family suites and connecting rooms, as well as a kids’ activity area and babysitting service upon request.",
  },
  { question: "What time is check-in and check-out?" },
  { question: "What time is check-in and check-out?" },
  { question: "What time is check-in and check-out?" },
  { question: "What time is check-in and check-out?" },
  { question: "What time is check-in and check-out?" },
  { question: "What time is check-in and check-out?" },
  { question: "What time is check-in and check-out?" },
  { question: "What time is check-in and check-out?" },
  {
    question: "What time is check-in and check-out?",
    answer:
      "Yes, we offer family suites and connecting rooms, as well as a kids’ activity area and babysitting service upon request.",
  },
];

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 4V16M4 10H16"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(9);

  return (
    <section className="flex w-full items-center justify-center bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16 xl:h-[781px] xl:px-20 xl:py-0">
      <div className="flex w-full max-w-[1280px] flex-col gap-10 sm:gap-12 xl:gap-16">
        <SectionHeading label="FAQ" title="Most Asked Questions" />

        <div className="grid grid-cols-1 gap-x-0 lg:grid-cols-2 lg:gap-x-10">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <button
                key={`${item.question}-${index}`}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-4 border-b border-white/20 py-4 text-left sm:py-5"
              >
                <div className="min-w-0 flex flex-col gap-3 sm:gap-4">
                  <span className="font-['Raleway'] text-[15px] font-medium leading-[1.4] text-white sm:text-[16px] sm:leading-[23px]">
                    {item.question}
                  </span>
                  {isOpen && item.answer ? (
                    <span className="font-['Raleway'] text-[13px] font-normal leading-[1.45] text-[#8e8e8e] sm:text-[14px] sm:leading-[20px]">
                      {item.answer}
                    </span>
                  ) : null}
                </div>
                <span className="mt-0.5 shrink-0">
                  {isOpen ? <CloseIcon /> : <PlusIcon />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
