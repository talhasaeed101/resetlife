"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { GoldButton } from "@/components/ui/GoldButton";
import { scrollToSection } from "@/lib/scroll";

const villaThumbs = [
  assets.villa.thumb1,
  assets.villa.thumb2,
  assets.villa.thumb3,
] as const;

export default function Villa() {
  const handleExplore = () => {
    scrollToSection("contact");
  };

  return (
    <section
      id="villa" className="flex w-full items-center justify-center bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16 xl:h-[960px] xl:px-20 xl:py-0">
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
            <GoldButton
              type="button"
              className="w-full sm:w-auto"
              onClick={handleExplore}
            >
              EXPLORE
            </GoldButton>
          </div>
        </div>

        {/* Desktop — unchanged */}
        <div className="hidden xl:block">
          <div className="absolute left-[60px] top-[60px] flex w-[438px] flex-col gap-10">
            <div className="glass-surface flex w-fit items-center rounded-[100px] p-[10px]">
              {villaThumbs.map((thumb, index) => (
                <div
                  key={thumb}
                  className={`relative h-[74px] w-[74px] overflow-hidden rounded-[110px] ${index < villaThumbs.length - 1 ? "-mr-[29px]" : ""}`}
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

          <h2 className="absolute bottom-[124px] left-[60px] w-[632px] font-['dtnightingale'] text-[60px] font-light leading-none text-white">
            Luxurious & Opulent Ambiance.
          </h2>

          <GoldButton
            type="button"
            className="absolute bottom-[60px] right-[60px]"
            onClick={handleExplore}
          >
            EXPLORE
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
