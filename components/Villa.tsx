"use client";

import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { ROUTES } from "@/lib/site";

const goldButtonClassName =
  "gold-button-luxury inline-flex items-center justify-center rounded-[12px] px-[24px] py-[16px] font-['BaskervvilleSC'] text-[16px] font-semibold leading-none text-[#050b08] h-[43px]";
const villaThumbs = [
  assets.villa.thumb1,
  assets.villa.thumb2,
  assets.villa.thumb3,
] as const;

export default function Villa() {
  return (
    <section
      id="villa" className="flex w-full items-center justify-center bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16 xl:px-20 xl:py-0">
      <div className="relative w-full max-w-[1280px] overflow-hidden rounded-[24px] md:rounded-[32px] xl:h-[760px] xl:rounded-[40px]">
        <div className="relative min-h-[480px] w-full sm:min-h-[560px] md:min-h-[640px] xl:absolute xl:inset-0 xl:min-h-0">
          <Image
            src={assets.villa.main}
            alt="Luxurious villa ambiance"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        {/* Mobile / tablet */}
        <div className="relative flex flex-col gap-8 p-6 sm:p-8 md:p-10 xl:hidden">
          <div className="flex flex-col gap-6">
            <div className="glass-surface flex w-fit items-center rounded-[100px] p-[8px] sm:p-[10px]">
              {villaThumbs.map((thumb, index) => (
                <div
                  key={thumb}
                  className={`relative h-[56px] w-[56px] overflow-hidden rounded-[110px] sm:h-[64px] sm:w-[64px] ${index < villaThumbs.length - 1 ? "-mr-[20px] sm:-mr-[24px]" : ""}`}
                >
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="74px"
                  />
                </div>
              ))}
            </div>
            <p className="max-w-[438px] font-['Raleway'] text-[16px] font-normal leading-normal text-white sm:text-[18px]">
              Thoughtfully designed amenities that bring comfort, convenience, and
              relaxation together for a truly refreshing stay.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-['dtnightingale'] text-[32px] font-light leading-[1.05] text-white sm:text-[40px] md:text-[48px]">
              Luxurious & Opulent Ambiance.
            </h2>
            <Link href={ROUTES.villa} className={`${goldButtonClassName} w-full sm:w-auto`}>
              EXPLORE
            </Link>
          </div>
        </div>

        {/* Desktop — unchanged */}
        <div className="hidden xl:block">
          <div className="absolute left-[60px] top-[60px] flex w-[438px] flex-col gap-10">
            <div
  className="flex w-fit items-center rounded-[100px] p-[10px] bg-cover bg-center bg-no-repeat h-[70px]"
  style={{
    backgroundImage: "url('/Images/villa/glass.png')",
  }}
>
              {villaThumbs.map((thumb, index) => (
                <div
                  key={thumb}
                  className={`relative h-[55px] w-[55px] overflow-hidden rounded-[110px] ${index < villaThumbs.length - 1 ? "-mr-[29px]" : ""}`}
                >
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="74px"
                  />
                </div>
              ))}
            </div>
            <p className="font-['Raleway'] text-[20px] font-normal leading-normal text-white">
              Thoughtfully designed amenities that bring comfort, convenience, and
              relaxation together for a truly refreshing stay.
            </p>
          </div>
          <div className="absolute bottom-[60px] left-[60px] right-[60px] flex items-end justify-between gap-8">
            <h2 className="max-w-[632px] font-['dtnightingale'] text-[60px] font-light leading-none text-white">
              Luxurious & Opulent Ambiance.
            </h2>

            <Link href={ROUTES.villa} className={`${goldButtonClassName} shrink-0`}>
              EXPLORE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
