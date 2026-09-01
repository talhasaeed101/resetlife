"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = "1000ms";
const REVEAL_DELAY_MS = 120;
const AUTO_INTERVAL = 5000;
const SLIDE_OUT_MS = 520;
const SLIDE_OFFSET = "56px";

type AnimPhase = "hidden" | "displayed" | "animated" | "exiting";

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

function cardAnimStyle(phase: AnimPhase): React.CSSProperties {
  const transition = `transform ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`;
  const enterFrom = `translateX(${SLIDE_OFFSET})`;
  const exitTo = `translateX(calc(-1 * ${SLIDE_OFFSET}))`;

  if (phase === "hidden") {
    return {
      transition,
      transform: enterFrom,
      opacity: 0,
    };
  }

  if (phase === "displayed") {
    return {
      transition: "none",
      transform: enterFrom,
      opacity: 0,
    };
  }

  if (phase === "exiting") {
    return {
      transition,
      transform: exitTo,
      opacity: 0,
    };
  }

  return {
    transition,
    transform: "translateX(0)",
    opacity: 1,
  };
}

function TestimonialCard({
  name,
  quote,
  rating = 5,
  style,
}: {
  name: string;
  location: string;
  quote: string;
  avatar: string;
  rating?: number;
  style?: React.CSSProperties;
}) {
  return (
    <article className="testimonial-card" style={style}>
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

      <blockquote className="testimonial-quote">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </article>
  );
}

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionPhase, setSectionPhase] = useState<AnimPhase>("hidden");
  const [slidePhase, setSlidePhase] = useState<AnimPhase>("animated");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const revealTimerRef = useRef<number | null>(null);
  const slideTimerRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setSlidePhase("exiting");

      if (slideTimerRef.current !== null) {
        window.clearTimeout(slideTimerRef.current);
      }

      slideTimerRef.current = window.setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setSlidePhase("displayed");

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setSlidePhase("animated");
          });
        });
      }, SLIDE_OUT_MS);
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (slideTimerRef.current !== null) {
        window.clearTimeout(slideTimerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionPhase("displayed");
          if (revealTimerRef.current !== null) {
            window.clearTimeout(revealTimerRef.current);
          }
          revealTimerRef.current = window.setTimeout(() => {
            setSectionPhase("animated");
          }, REVEAL_DELAY_MS);
          return;
        }

        if (revealTimerRef.current !== null) {
          window.clearTimeout(revealTimerRef.current);
          revealTimerRef.current = null;
        }
        setSectionPhase("hidden");
      },
      { threshold: 0.2 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }
    };
  }, []);

  const item = TESTIMONIALS[activeIndex];
  const effectivePhase =
    sectionPhase !== "animated" ? sectionPhase : slidePhase;

  return (
    <section id="testimonial" ref={sectionRef} className="testimonial-section">
      <div className="testimonial-inner">
        <div className="testimonial-stage">
          <TestimonialCard
            name={item.name}
            location={item.location}
            quote={item.quote}
            avatar={item.avatar}
            rating={5}
            style={cardAnimStyle(effectivePhase)}
          />
        </div>
      </div>
    </section>
  );
}
