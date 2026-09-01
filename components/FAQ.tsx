"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "What events can I host?",
    answer:
      "You can host a variety of events including birthdays, mehndi, nikkah, photography sessions, corporate events, and private gatherings.",
  },
  {
    question: "How many guests can you accommodate?",
    answer:
      "Our farmhouse can accommodate different group sizes depending on the type of event. Please contact us with your expected number of guests so we can guide you accordingly.",
  },
  {
    question: "Do you offer overnight stays?",
    answer:
      "Yes, Reset Life Farmhouse offers overnight villa stays. The villa is available at Rs. 35,000 per night.",
  },
  {
    question: "How do I check availability?",
    answer:
      "Select your event type, number of guests, check-in and check-out dates in the booking section and submit your inquiry. Our team will get back to you with availability and further details.",
  },
  {
    question: "Is online payment required?",
    answer:
      "Reset Life Farmhouse does not use an online payment or instant booking system. Once your inquiry is received, our team will contact you to discuss availability, pricing, and booking confirmation.",
  },
  {
    question: "Can I arrange my own catering?",
    answer:
      "Event arrangements can vary depending on your requirements. Contact our team to discuss catering, décor, setup, and other arrangements for your event.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, parking is available for guests visiting Reset Life Farmhouse.",
  },
  {
    question: "Where are you located?",
    answer:
      "Reset Life Farmhouse is located in Gulberg Greens, Islamabad, offering a private and peaceful setting surrounded by nature.",
  },
  {
    question: "How do I contact you?",
    answer:
      "You can submit an inquiry through our website or contact us directly via WhatsApp or email. Our team will help you with availability and booking details.",
  },
  {
    question: "Can I visit before booking?",
    answer:
      "Yes, you can contact our team to discuss a visit and check the property before finalizing your event or stay.",
  },
];

function FaqQuestion({ text }: { text: string }) {
  const hasMark = text.endsWith("?");
  const questionText = hasMark ? text.slice(0, -1) : text;

  return (
    <span className="faq-item__question">
      <span className="faq-item__question-text">{questionText}</span>
      {hasMark ? <span className="faq-item__question-mark">?</span> : null}
    </span>
  );
}

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

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 4L16 16M16 4L4 16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

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
            const triggerId = `faq-trigger-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={triggerId} className="faq-item">
                <button
                  type="button"
                  id={triggerId}
                  className="faq-item__trigger"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => handleToggle(index)}
                >
                  <FaqQuestion text={item.question} />
                  <span className="faq-item__icon" aria-hidden>
                    {isOpen ? <CloseIcon /> : <PlusIcon />}
                  </span>
                </button>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={`faq-item__answer-wrap${isOpen ? " is-open" : ""}`}
                >
                  <div className="faq-item__answer-inner">
                    <p className="faq-item__answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
