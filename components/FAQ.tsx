"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/lib/faq";

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

type FaqItemCardProps = {
  item: (typeof FAQ_ITEMS)[number];
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
};

function FaqItemCard({ item, index, isOpen, onToggle }: FaqItemCardProps) {
  const triggerId = `faq-trigger-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    <div className="faq-item" style={{ order: index }}>
      <button
        type="button"
        id={triggerId}
        className="faq-item__trigger"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={() => onToggle(index)}
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
}

const leftColumnIndices = FAQ_ITEMS.map((_, index) => index).filter(
  (index) => index % 2 === 0,
);
const rightColumnIndices = FAQ_ITEMS.map((_, index) => index).filter(
  (index) => index % 2 === 1,
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const renderColumn = (indices: number[]) =>
    indices.map((index) => (
      <FaqItemCard
        key={`faq-${index}`}
        item={FAQ_ITEMS[index]}
        index={index}
        isOpen={openIndex === index}
        onToggle={handleToggle}
      />
    ));

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
          <div className="faq-column">{renderColumn(leftColumnIndices)}</div>
          <div className="faq-column">{renderColumn(rightColumnIndices)}</div>
        </div>
      </div>
    </section>
  );
}
