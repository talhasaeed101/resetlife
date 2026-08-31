"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <Image
      src={filled ? "/Images/Footer/fillstar.svg" : "/Images/Footer/blankstar.svg"}
      alt={filled ? "filled star" : "empty star"}
      width={16}
      height={16}
    />
  );
}

function TestimonialCard({
  name,
  quote,
  avatar,
  rating = 5,
}: {
  name: string;
  location: string;
  quote: string;
  avatar: string;
  rating?: number;
}) {
  return (
    <div className="testimonial-card">
      {/* Author row: avatar + name + stars side by side */}
      <div className="testimonial-author">
        <div className="testimonial-avatar">
          <Image src="/Images/Footer/avatar.svg" alt={name} fill className="object-cover" sizes="56px" />
        </div>
        <div className="testimonial-author-info">
          <p className="testimonial-name">{name}</p>
          <div className="testimonial-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < rating} />
            ))}
          </div>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="testimonial-quote">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </div>
  );
}

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_INTERVAL = 4000;

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const item = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonial" className="testimonial-section">
      <div className="testimonial-inner">
        <TestimonialCard
          key={activeIndex}
          name={item.name}
          location={item.location}
          quote={item.quote}
          avatar={item.avatar}
          rating={5}
        />

        {/* Dot indicators */}
        {/* <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot${i === activeIndex ? " testimonial-dot--active" : ""}`}
              onClick={() => {
                setActiveIndex(i);
                startTimer();
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
