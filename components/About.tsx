"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TEXT_GRAY = { r: 142, g: 142, b: 142 };
const TEXT_WHITE = { r: 255, g: 255, b: 255 };

const ABOUT_HEADING =
  "Reset Life is a peaceful escape designed to help you slow down, breathe deeply, and reconnect with what truly matters. Surrounded by nature and away from the noise of everyday life, it sets the perfect tone for an unhurried stay.";

const ABOUT_HEADING_CHARS = ABOUT_HEADING.split("");
const PIN_HEIGHT_VH = 200 + Math.ceil(ABOUT_HEADING_CHARS.length / 3);

function mixTextColor(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  const r = Math.round(TEXT_GRAY.r + (TEXT_WHITE.r - TEXT_GRAY.r) * clamped);
  const g = Math.round(TEXT_GRAY.g + (TEXT_WHITE.g - TEXT_GRAY.g) * clamped);
  const b = Math.round(TEXT_GRAY.b + (TEXT_WHITE.b - TEXT_GRAY.b) * clamped);
  return `rgb(${r}, ${g}, ${b})`;
}

function getLetterColor(index: number, total: number, scrollProgress: number) {
  const letterStart = index / total;
  const letterEnd = (index + 1) / total;
  const letterProgress = (scrollProgress - letterStart) / (letterEnd - letterStart);
  return mixTextColor(letterProgress);
}

export default function About() {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const container = pinContainerRef.current;
    if (!container || reduceMotion) {
      return;
    }

    const updateProgress = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;

      if (scrollable <= 0) {
        setScrollProgress(1);
        return;
      }

      const progress = -rect.top / scrollable;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [reduceMotion]);

  const effectiveProgress = reduceMotion ? 1 : scrollProgress;

  return (
    <div
      ref={pinContainerRef}
      id="about"
      className="relative w-full bg-[#050b08]"
      // style={{ height: reduceMotion ? "auto" : `${PIN_HEIGHT_VH}vh` }}
    >
      <section className="sticky top-0 flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[#050b08] py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-16 xl:px-20">
          <div className="flex w-full flex-col md:block">
            {/* Top Left Images Group */}
            <div className="z-10 mb-12 flex items-start gap-4 md:absolute md:left-10 md:top-0 md:mb-0 lg:left-16 xl:left-20">
              <div className="relative h-[160px] w-[160px] shrink-0 overflow-hidden rounded-xl md:h-[280px] md:w-[180px] lg:h-[200px] lg:w-[200px] lg:rounded-2xl">
                <Image
                  src="/Images/about/img1.svg"
                  alt="Reset Life exterior"
                  className="object-cover"
                  height={200}
                  width={200}
                  priority
                />
              </div>
              <div className="relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-lg md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px] lg:rounded-xl">
                <Image
                  src="/Images/about/img2.svg"
                  alt="Reset Life detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 100px"
                />
              </div>
            </div>

            {/* Center Text */}
            <div className="relative z-20 mx-auto flex w-full  flex-col md:pb-[80px] md:pt-[100px] lg:pb-[120px] lg:pt-[140px]">
              <div className="mt-[40px] flex flex-col md:mt-[50px] lg:mt-[93px]">
                <div className="flex w-full flex-col self-center max-w-[1000px]">
                  <p className="about-text-main mb-6 w-full text-center font-['BaskervvilleSC'] text-[14px] font-semibold uppercase tracking-[0.2em] sm:text-[18px] md:text-right">
                    About
                  </p>
                  <h2 className="text-right font-['dtnightingale'] text-[38px] font-light leading-[100%] tracking-[0%]">
                    {ABOUT_HEADING_CHARS.map((char, index) => (
                      <span
                        key={`${char}-${index}`}
                        style={{
                          color: getLetterColor(
                            index,
                            ABOUT_HEADING_CHARS.length,
                            effectiveProgress,
                          ),
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </h2>
                </div>

                {/* Bottom Right Image */}
                <div className="mt-[40px] flex w-full justify-end md:mt-[50px] lg:mt-[60px]">
                  <div className="relative h-[320px] w-[240px] overflow-hidden rounded-xl md:h-[360px] md:w-[260px] lg:h-[400px] lg:w-[280px] lg:rounded-2xl">
                    <Image
                      src="/Images/about/img3.svg"
                      alt="Reset Life gardens"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 240px, 280px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
