import Image from "next/image";
import { assets } from "@/lib/assets";
import { GoldButton } from "@/components/ui/GoldButton";

const bookingFields = [
  { id: "event-type", label: "Event Type", placeholder: "Choose", icon: assets.hero.arrowDown },
  { id: "guests", label: "Guest(s)", placeholder: "Choose", icon: assets.hero.arrowDown },
  { id: "check-in", label: "Check-In Date", placeholder: "dd- --- - yyyy", icon: assets.hero.calendar },
  { id: "check-out", label: "Check-Out Date", placeholder: "dd- --- - yyyy", icon: assets.hero.calendar },
] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden xl:block xl:h-[1024px] xl:min-h-0">
      <Image
        src={assets.hero.background}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <header className="relative z-10 flex w-full max-w-[1440px] items-start justify-between self-center px-5 py-6 sm:px-8 md:px-10 lg:px-16 xl:absolute xl:left-0 xl:right-0 xl:top-10 xl:mx-auto xl:px-20 xl:py-0">
        <div className="flex items-end gap-[9px]">
          <Image
            src={assets.hero.logoIcon}
            alt="Reset Life"
            width={28}
            height={40}
            className="h-8 w-[22px] sm:h-10 sm:w-[27.922px]"
          />
          <span className="text-gradient-farm font-['BaskervvilleSC'] text-[18px] uppercase tracking-[2px] sm:text-[24px] sm:tracking-[2.4px]">
            Reset life
          </span>
        </div>

        <button
          type="button"
          className="glass-surface flex items-center gap-[6px] rounded-[12px] px-3 py-2"
          aria-label="Open menu"
        >
          <span className="font-['dtnightingale'] text-[14px] capitalize tracking-[1.6px] text-white sm:text-[16px]">
            Menu
          </span>
          <Image
            src={assets.hero.menuIcon}
            alt=""
            width={28}
            height={28}
            className="h-6 w-6 sm:h-7 sm:w-7"
          />
        </button>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 self-center px-5 py-8 text-center sm:gap-8 sm:px-8 md:px-10 xl:absolute xl:left-1/2 xl:top-[293px] xl:w-[671px] xl:-translate-x-1/2 xl:gap-11 xl:px-0 xl:py-0">
        <h1 className="font-['dtnightingale'] text-[36px] font-light leading-[1.05] text-white sm:text-[44px] md:text-[64px] lg:text-[72px] xl:text-[86px] xl:leading-[84px]">
          Escape to Nature.
          <br />
          Stay in Luxury.
        </h1>
        <p className="max-w-[540px] font-['Raleway'] text-[16px] font-medium leading-snug text-[#8e8e8e] sm:text-[18px] md:text-[20px] xl:max-w-none xl:text-[24px] xl:leading-none">
          Relax, reconnect, and create unforgettable moments surrounded by
          nature and tranquility.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] self-center px-5 pb-8 sm:px-8 md:px-10 lg:px-16 xl:absolute xl:bottom-[63px] xl:left-1/2 xl:-translate-x-1/2 xl:px-0 xl:pb-0">
        <div className="glass-surface overflow-hidden rounded-[16px] p-4 sm:p-5 xl:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex lg:min-w-0 lg:flex-1 lg:gap-6">
              {bookingFields.map((field) => (
                <div
                  key={field.id}
                  className="flex min-w-0 flex-col gap-3 px-0 sm:gap-4 lg:flex-1 lg:px-4"
                >
                  <span className="font-['BaskervvilleSC'] text-[16px] font-semibold text-white sm:text-[18px]">
                    {field.label}
                  </span>
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-['Raleway'] text-[14px] font-medium text-[#8e8e8e] sm:text-[16px]">
                      {field.placeholder}
                    </span>
                    <Image
                      src={field.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 shrink-0"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="shrink-0 lg:self-center">
              <GoldButton className="w-full lg:w-auto">BOOK NOW</GoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
