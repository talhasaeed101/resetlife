"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { BookNowButton } from "@/components/BookNowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollDrivenCarousel } from "@/lib/useScrollDrivenCarousel";

const eventDescription =
  "Casana began as a modest seaside retreat founded by a local family who saw beauty in simplicity. With just a handful of rooms and a small open-air café, it became a quiet haven for travelers seeking rest, ocean breeze, and the sound of waves beyond their windows.";

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const DURATION = "900ms";

/** Shared transition style applied to every animated element */
const transitionStyle = {
  transition: `transform ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`,
  willChange: "transform, opacity",
} as const;

/** Visible vs hidden inline style */
const visible = { transform: "translateX(0)", opacity: 1 } as const;
const hidden = { transform: "translateX(80px)", opacity: 0 } as const;

/** heading hidden goes upward */
const headingVisible = { transform: "translateY(0)", opacity: 1 } as const;
const headingHidden = { transform: "translateY(40px)", opacity: 0 } as const;

function animStyle(
  isVisible: boolean,
  delayMs: number,
  fromState: typeof hidden | typeof headingHidden = hidden,
) {
  return {
    ...transitionStyle,
    transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
    ...(isVisible ? visible : fromState),
  } as React.CSSProperties;
}

export default function Events() {
  const { sectionRef, trackRef, animState } = useScrollDrivenCarousel({
    sensitivity: 1.4,
    friction: 0.88,
  });

  const show = animState === "visible";

  return (
    <section
      id="events"
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#050b08] py-16 xl:h-[838px] xl:pt-[100px] xl:pb-0"
    >
      {/* ── Heading – slides up ── */}
      <div
        className="mx-auto mb-10 w-full px-5 sm:mb-12 sm:px-8 md:px-10 lg:px-16 xl:mb-[70px] xl:px-20"
        style={animStyle(show, 0, headingHidden)}
      >
        <SectionHeading
          label="EVENTS"
          title="Unforgettable Moments, Beautifully Celebrated"
        />
      </div>

      {/* ── Full-bleed scrollable carousel ── */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-2 pl-5 pr-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:pl-8 sm:pr-8 md:pl-10 md:pr-10 lg:pl-16 lg:pr-16 xl:pb-4 xl:pl-20 xl:pr-20 [&::-webkit-scrollbar]:hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {/* Photography image */}
        <div
          className="relative h-[420px] w-[78vw] max-w-[380px] shrink-0 overflow-hidden rounded-[24px] sm:h-[460px] sm:w-[340px] xl:h-[500px] xl:w-[380px] xl:rounded-[30px]"
          style={animStyle(show, 80)}
        >
          <Image src={assets.events.photography} alt="Photography event" fill className="object-cover" sizes="380px" />
        </div>

        {/* Photography text */}
        <div
          className="flex h-[420px] w-[72vw] max-w-[340px] shrink-0 flex-col justify-end gap-5 sm:h-[460px] sm:w-[300px] sm:gap-6 xl:h-[500px] xl:w-[340px]"
          style={animStyle(show, 200)}
        >
          <h3 className="font-['dtnightingale'] text-[32px] font-light leading-none text-white sm:text-[36px] xl:text-[40px]">Photography</h3>
          <p className="font-['Raleway'] text-[14px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]">{eventDescription}</p>
          <BookNowButton eventType="Photography" className="w-full sm:w-auto" />
        </div>

        {/* Nikkah image collage */}
        <div
          className="flex h-[380px] w-[72vw] max-w-[340px] shrink-0 flex-col items-end gap-4 sm:w-[300px] xl:h-[420px] xl:w-[340px] xl:gap-5"
          style={animStyle(show, 320)}
        >
          <div className="flex gap-4 sm:gap-5">
            <div className="relative h-[72px] w-[72px] overflow-hidden rounded-[12px] sm:h-[90px] sm:w-[90px]">
              <Image src={assets.events.nikkahSmall} alt="" fill className="object-cover" sizes="90px" />
            </div>
            <div className="relative h-[160px] w-[160px] overflow-hidden rounded-[16px] sm:h-[200px] sm:w-[200px] sm:rounded-[20px]">
              <Image src={assets.events.nikkahLarge} alt="Nikkah ceremony" fill className="object-cover" sizes="200px" />
            </div>
          </div>
          <div className="relative h-[160px] w-[160px] overflow-hidden rounded-[16px] sm:h-[200px] sm:w-[200px] sm:rounded-[20px]">
            <Image src={assets.events.nikkahAccent} alt="" fill className="object-cover" sizes="200px" />
          </div>
        </div>

        {/* Nikkah text */}
        <div
          className="flex h-[420px] w-[72vw] max-w-[340px] shrink-0 flex-col gap-5 sm:h-[460px] sm:w-[300px] sm:gap-6 xl:h-[500px] xl:w-[340px]"
          style={animStyle(show, 440)}
        >
          <h3 className="font-['dtnightingale'] text-[32px] font-light leading-none text-white sm:text-[36px] xl:text-[40px]">Nikkah</h3>
          <p className="font-['Raleway'] text-[14px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]">{eventDescription}</p>
          <BookNowButton eventType="Nikkah" className="w-full sm:w-auto" />
        </div>

        {/* Birthday text */}
        <div
          className="flex h-[420px] w-[72vw] max-w-[340px] shrink-0 flex-col items-start justify-center gap-5 sm:h-[460px] sm:w-[300px] sm:gap-6 xl:h-[500px] xl:w-[340px] xl:items-end xl:text-right"
          style={animStyle(show, 560)}
        >
          <h3 className="font-['dtnightingale'] text-[32px] font-light leading-none text-white sm:text-[36px] xl:text-[40px]">Birthday</h3>
          <p className="font-['Raleway'] text-[14px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]">{eventDescription}</p>
          <BookNowButton eventType="Birthday" className="w-full sm:w-auto" />
        </div>

        {/* Birthday image */}
        <div
          className="relative h-[420px] w-[78vw] max-w-[380px] shrink-0 overflow-hidden rounded-[24px] sm:h-[460px] sm:w-[340px] xl:h-[500px] xl:w-[380px] xl:rounded-[30px]"
          style={animStyle(show, 680)}
        >
          <Image src={assets.events.birthday} alt="Birthday celebration" fill className="object-cover" sizes="380px" />
        </div>

        {/* Corporate Events text */}
        <div
          className="flex h-[420px] w-[72vw] max-w-[340px] shrink-0 flex-col items-start justify-end gap-5 sm:h-[460px] sm:w-[300px] sm:gap-6 xl:h-[500px] xl:w-[340px] xl:items-end xl:text-right"
          style={animStyle(show, 800)}
        >
          <h3 className="max-w-[200px] font-['dtnightingale'] text-[32px] font-light leading-[1.15] text-white sm:text-[36px] xl:text-[40px] xl:leading-[48px]">
            Corporate Events
          </h3>
          <p className="font-['Raleway'] text-[14px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]">{eventDescription}</p>
          <BookNowButton eventType="Corporate Events" className="w-full sm:w-auto" />
        </div>

        {/* Corporate Events image */}
        <div
          className="relative h-[420px] w-[78vw] max-w-[380px] shrink-0 overflow-hidden rounded-[24px] sm:h-[460px] sm:w-[340px] xl:h-[500px] xl:w-[380px] xl:rounded-[30px]"
          style={animStyle(show, 920)}
        >
          <Image src={assets.events.corporate} alt="Corporate event" fill className="object-cover" sizes="380px" />
        </div>
      </div>
    </section>
  );
}
