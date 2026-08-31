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
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(9);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-section__inner">
        <SectionHeading
          label="FAQ"
          title="Most Asked Questions"
          labelClassName="text-[16px]"
          titleClassName="text-[32px] sm:text-[40px] xl:text-[50px]"
        />

        <div className="faq-grid">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={`${item.question}-${index}`} className="faq-item">
                <button
                  type="button"
                  className="faq-item__trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="faq-item__question">{item.question}</span>
                  <span className="faq-item__icon" aria-hidden>
                    <PlusIcon />
                  </span>
                </button>
                {isOpen && item.answer ? (
                  <p className="faq-item__answer">{item.answer}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
