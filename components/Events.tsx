import Image from "next/image";
import { assets } from "@/lib/assets";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

const eventDescription =
  "Casana began as a modest seaside retreat founded by a local family who saw beauty in simplicity. With just a handful of rooms and a small open-air café, it became a quiet haven for travelers seeking rest, ocean breeze, and the sound of waves beyond their windows.";

export default function Events() {
  return (
    <section className="w-full overflow-hidden bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16 xl:h-[838px] xl:px-20 xl:pt-[100px] xl:pb-0">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 sm:gap-12 xl:gap-[70px]">
        <SectionHeading
          label="EVENTS"
          title="Unforgettable Moments, Beautifully Celebrated"
        />

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:gap-5 sm:px-8 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16 xl:mx-0 xl:px-0 xl:pb-4 [&::-webkit-scrollbar]:hidden">
          <div className="relative h-[420px] w-[280px] shrink-0 overflow-hidden rounded-[24px] sm:h-[460px] sm:w-[300px] xl:h-[500px] xl:w-[313px] xl:rounded-[30px]">
            <Image
              src={assets.events.photography}
              alt="Photography event"
              fill
              className="object-cover"
              sizes="313px"
            />
          </div>

          <div className="flex h-[420px] w-[280px] shrink-0 flex-col justify-end gap-5 sm:h-[460px] sm:w-[300px] sm:gap-6 xl:h-[500px] xl:w-[313px]">
            <h3 className="font-['dtnightingale'] text-[32px] font-light leading-none text-white sm:text-[36px] xl:text-[40px]">
              Photography
            </h3>
            <p className="font-['Raleway'] text-[14px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]">
              {eventDescription}
            </p>
            <GoldButton className="w-full sm:w-auto">BOOK NOW</GoldButton>
          </div>

          <div className="flex h-[380px] w-[280px] shrink-0 flex-col items-end gap-4 sm:w-[300px] xl:h-[420px] xl:w-[310px] xl:gap-5">
            <div className="flex gap-4 sm:gap-5">
              <div className="relative h-[72px] w-[72px] overflow-hidden rounded-[12px] sm:h-[90px] sm:w-[90px]">
                <Image
                  src={assets.events.nikkahSmall}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="90px"
                />
              </div>
              <div className="relative h-[160px] w-[160px] overflow-hidden rounded-[16px] sm:h-[200px] sm:w-[200px] sm:rounded-[20px]">
                <Image
                  src={assets.events.nikkahLarge}
                  alt="Nikkah ceremony"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
            <div className="relative h-[160px] w-[160px] overflow-hidden rounded-[16px] sm:h-[200px] sm:w-[200px] sm:rounded-[20px]">
              <Image
                src={assets.events.nikkahAccent}
                alt=""
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          </div>

          <div className="flex h-[420px] w-[280px] shrink-0 flex-col gap-5 sm:h-[460px] sm:w-[300px] sm:gap-6 xl:h-[500px] xl:w-[313px]">
            <h3 className="font-['dtnightingale'] text-[32px] font-light leading-none text-white sm:text-[36px] xl:text-[40px]">
              Nikkah
            </h3>
            <p className="font-['Raleway'] text-[14px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]">
              {eventDescription}
            </p>
            <GoldButton className="w-full sm:w-auto">BOOK NOW</GoldButton>
          </div>

          <div className="flex h-[420px] w-[280px] shrink-0 flex-col items-start justify-center gap-5 sm:h-[460px] sm:w-[300px] sm:gap-6 xl:h-[500px] xl:w-[313px] xl:items-end xl:text-right">
            <h3 className="font-['dtnightingale'] text-[32px] font-light leading-none text-white sm:text-[36px] xl:text-[40px]">
              Birthday
            </h3>
            <p className="font-['Raleway'] text-[14px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]">
              {eventDescription}
            </p>
            <GoldButton className="w-full sm:w-auto">BOOK NOW</GoldButton>
          </div>

          <div className="relative h-[420px] w-[280px] shrink-0 overflow-hidden rounded-[24px] sm:h-[460px] sm:w-[300px] xl:h-[500px] xl:w-[313px] xl:rounded-[30px]">
            <Image
              src={assets.events.birthday}
              alt="Birthday celebration"
              fill
              className="object-cover"
              sizes="313px"
            />
          </div>

          <div className="flex h-[420px] w-[280px] shrink-0 flex-col items-start justify-end gap-5 sm:h-[460px] sm:w-[300px] sm:gap-6 xl:h-[500px] xl:w-[313px] xl:items-end xl:text-right">
            <h3 className="max-w-[186px] font-['dtnightingale'] text-[32px] font-light leading-[1.15] text-white sm:text-[36px] xl:text-[40px] xl:leading-[48px]">
              Corporate Events
            </h3>
            <p className="font-['Raleway'] text-[14px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]">
              {eventDescription}
            </p>
            <GoldButton className="w-full sm:w-auto">BOOK NOW</GoldButton>
          </div>

          <div className="relative h-[420px] w-[280px] shrink-0 overflow-hidden rounded-[24px] sm:h-[460px] sm:w-[300px] xl:h-[500px] xl:w-[313px] xl:rounded-[30px]">
            <Image
              src={assets.events.corporate}
              alt="Corporate event"
              fill
              className="object-cover"
              sizes="313px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
