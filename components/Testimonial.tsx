import Image from "next/image";
import { assets } from "@/lib/assets";

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


export default function Testimonial() {
  return (
    <section className="flex w-full items-center justify-center bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16 xl:h-[452px] xl:px-20 xl:py-0">
      <div className="flex w-full max-w-[900px] flex-col items-center gap-5 text-center sm:gap-6">
        <div className="relative h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20">
          <Image
            src={assets.testimonial.avatar}
            alt="Jane Oliver"
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <p className="font-['Raleway'] text-[15px] font-medium leading-none text-white sm:text-[16px]">
          Jane Oliver
        </p>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} />
          ))}
        </div>

        <blockquote className="font-['dtnightingale'] text-[20px] font-light italic leading-[1.4] text-white sm:text-[24px] md:text-[26px] xl:text-[28px]">
          &ldquo;It was a dream stay for us, the resort is such a beautiful place
          with the best services. The environment is so peaceful and luxury from
          the moment we arrived at this resort. Everything was just amazing
          &amp; perfect.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
