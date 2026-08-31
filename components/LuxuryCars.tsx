"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoldButton } from "@/components/ui/GoldButton";

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const DURATION = "900ms";

const transitionStyle = {
  transition: `transform ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`,
  willChange: "transform, opacity",
} as const;

const visibleFromLeft = { transform: "translateX(0)", opacity: 1 } as const;
const hiddenToLeft = { transform: "translateX(-80px)", opacity: 0 } as const;

const visibleFromRight = { transform: "translateX(0)", opacity: 1 } as const;
const hiddenToRight = { transform: "translateX(80px)", opacity: 0 } as const;

const visibleFromBottom = { transform: "translateY(0)", opacity: 1 } as const;
const hiddenToBottom = { transform: "translateY(40px)", opacity: 0 } as const;

function inlineAnim(
  isVisible: boolean,
  delayMs: number,
  direction: "left" | "right" | "up" = "right",
): React.CSSProperties {
  const from =
    direction === "left"
      ? hiddenToLeft
      : direction === "up"
        ? hiddenToBottom
        : hiddenToRight;
  const to =
    direction === "left"
      ? visibleFromLeft
      : direction === "up"
        ? visibleFromBottom
        : visibleFromRight;

  return {
    ...transitionStyle,
    transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
    ...(isVisible ? to : from),
  };
}

const carDescription =
  "Our luxury car reservation service offers a seamless blend of comfort, elegance, and convenience, whether you're arriving at the farmhouse, exploring the city, attending a special event, or heading out for the evening. Choose a premium vehicle and enjoy a refined travel experience designed around your stay, with professional service and effortless comfort from start to finish.";

export default function LuxuryCars() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animState, setAnimState] = useState<"hidden" | "visible">("hidden");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf1: number;
    let raf2: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Paint hidden state first, then flip visible after two rAFs
          setAnimState("hidden");
          raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              setAnimState("visible");
            });
          });
        } else {
          cancelAnimationFrame(raf1);
          cancelAnimationFrame(raf2);
          setAnimState("hidden");
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  const show = animState === "visible";

  return (
    <section
      id="luxury-cars"
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16 xl:px-20 xl:py-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12 lg:flex-row lg:gap-16 xl:gap-20">

        {/* ── Left: stacked car images ── */}
        <div
          className="relative flex w-full shrink-0 items-start justify-center lg:w-[48%]"
          style={{ minHeight: "420px" }}
        >
          {/* car1 – large card, top-left */}
          <div
            className="relative z-10 h-[340px] w-[240px] overflow-hidden rounded-[24px] shadow-2xl sm:h-[380px] sm:w-[270px] md:h-[420px] md:w-[300px] xl:h-[465px] xl:w-[335px] xl:rounded-[30px]"
            style={inlineAnim(show, 80, "left")}
          >
            <Image
              src="/Images/Luxurycars/car1.svg"
              alt="Luxury car at farmhouse"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 240px, (max-width: 768px) 270px, (max-width: 1280px) 300px, 335px"
            />
          </div>

          {/* car2 – smaller card, bottom-right, overlapping */}
          <div
            className="absolute bottom-0 right-0 z-20 h-[200px] w-[170px] overflow-hidden rounded-[20px] shadow-2xl sm:bottom-[-10px] sm:h-[260px] sm:w-[200px] md:h-[260px] md:w-[220px] xl:h-[260px] xl:w-[260px] xl:rounded-[24px]"
            style={inlineAnim(show, 200, "right")}
          >
            <Image
              src="/Images/Luxurycars/car2.svg"
              alt="Premium luxury vehicle"
              height={260}
              width={260}
              className="object-cover"
             
            />
          </div>
        </div>

        {/* ── Right: text content ── */}
        <div className="flex w-full flex-col gap-6 lg:w-[52%] xl:gap-8">
          {/* Label */}
          <p
            className="text-gradient-farm font-['BaskervvilleSC'] text-[14px] font-semibold leading-none tracking-[0.08em] sm:text-[16px]"
            style={inlineAnim(show, 120, "up")}
          >
            LUXURY RIDE
          </p>

          {/* Heading */}
          <h2
            className="font-['dtnightingale'] text-[40px] font-light leading-none tracking-[0.01em] text-white sm:text-[45px] xl:text-[50px] max-w-[302px] sm:max-w-[400px] lg:max-w-[480px]"
            style={inlineAnim(show, 220, "up")}
          >
            Your Ride, Your Luxury
          </h2>
          {/* Description */}
          <p
            className="font-['Raleway'] text-[14px] font-normal leading-relaxed text-[#8e8e8e] sm:text-[15px] xl:text-[16px]"
            style={inlineAnim(show, 320, "up")}
          >
            {carDescription}
          </p>

          {/* CTA */}
          <div style={inlineAnim(show, 440, "up")}>
            <GoldButton type="button" className="w-full sm:w-auto">
              BOOK NOW
            </GoldButton>
          </div>
        </div>
      </div>
    </section>
  );
}
