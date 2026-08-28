"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/lib/testimonials";
import { useAutoScrollCarousel } from "@/lib/useAutoScrollCarousel";

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 1.5L10.76 6.26L15.75 6.82L12.13 10.14L13.32 15L9 12.57L4.68 15L5.87 10.14L2.25 6.82L7.24 6.26L9 1.5Z"
        fill="#DFCBA2"
      />
    </svg>
  );
}

function TestimonialCard({
  name,
  quote,
  avatar,
}: {
  name: string;
  quote: string;
  avatar: string;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-5 px-5 text-center sm:gap-6">
      <div className="relative h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <p className="font-['Raleway'] text-[15px] font-medium leading-none text-white sm:text-[16px]">
        {name}
      </p>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} />
        ))}
      </div>

      <blockquote className="max-w-[900px] font-['dtnightingale'] text-[20px] font-light italic leading-[1.4] text-white sm:text-[24px] md:text-[26px] xl:text-[28px]">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </div>
  );
}

export default function Testimonial() {
  const { ref, handlers } = useAutoScrollCarousel({
    speed: 0.5,
    loopAtHalf: true,
  });
  const slides = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonial"
      className="flex w-full items-center justify-center overflow-hidden bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16 xl:h-[452px] xl:px-20 xl:py-0"
    >
      <div className="w-full max-w-[900px] overflow-hidden">
        <div
          ref={ref}
          {...handlers}
          data-auto-scroll="testimonial"
          className="auto-scroll-carousel flex w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((item, index) => (
            <div key={`${item.id}-${index}`} className="w-full shrink-0 grow-0 basis-full">
              <TestimonialCard
                name={item.name}
                quote={item.quote}
                avatar={item.avatar}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
