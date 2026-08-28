import Image from "next/image";
import { assets } from "@/lib/assets";

const aboutCopy =
  "Reset Life is a peaceful escape designed to help you slow down, breathe deeply, and reconnect with what truly matters. Surrounded by nature and away from the noise of everyday life, it sets the perfect tone for an unhurried stay";

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16 xl:flex xl:h-[1024px] xl:items-center xl:justify-center xl:px-20 xl:py-0"
    >
      {/* Mobile / tablet layout */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 xl:hidden">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-gradient-farm font-['BaskervvilleSC'] text-[16px] font-semibold leading-none sm:text-[18px]">
            ABOUT
          </p>
          <h2 className="font-['dtnightingale'] text-[24px] font-light leading-[1.35] text-white sm:text-[28px] md:text-[32px] md:leading-[1.3]">
            {aboutCopy}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <div className="relative aspect-square w-full overflow-hidden rounded-[16px]">
            <Image
              src={assets.about.image1}
              alt="Reset Life farmhouse exterior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 280px"
            />
          </div>
          <div className="relative aspect-[200/275] w-full overflow-hidden rounded-[16px]">
            <Image
              src={assets.about.image3}
              alt="Reset Life estate garden"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 280px"
            />
          </div>
        </div>

        <div className="relative mx-auto h-[90px] w-[90px] overflow-hidden rounded-[12px]">
          <Image
            src={assets.about.image2}
            alt="Reset Life interior detail"
            fill
            className="object-cover"
            sizes="90px"
          />
        </div>
      </div>

      {/* Desktop layout — unchanged */}
      <div className="relative hidden h-[824px] w-[1280px] xl:block">
        <div className="absolute left-0 top-[40px] h-[200px] w-[200px] overflow-hidden rounded-[16px]">
          <Image
            src={assets.about.image1}
            alt="Reset Life farmhouse exterior"
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>

        <div className="absolute right-[300px] top-[220px] h-[90px] w-[90px] overflow-hidden rounded-[12px]">
          <Image
            src={assets.about.image2}
            alt="Reset Life interior detail"
            fill
            className="object-cover"
            sizes="90px"
          />
        </div>

        <div className="absolute left-1/2 top-1/2 flex w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 text-center">
          <p className="text-gradient-farm font-['BaskervvilleSC'] text-[18px] font-semibold leading-none">
            ABOUT
          </p>
          <h2 className="font-['dtnightingale'] text-[38px] font-light leading-[49px] text-white">
            {aboutCopy}
          </h2>
        </div>

        <div className="absolute bottom-[40px] right-0 h-[275px] w-[200px] overflow-hidden rounded-[16px]">
          <Image
            src={assets.about.image3}
            alt="Reset Life estate garden"
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
      </div>
    </section>
  );
}
