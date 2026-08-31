"use client";

import Image from "next/image";
import { useInViewAnimation } from "@/lib/useInViewAnimation";

export default function About() {
  const { ref, isVisible } = useInViewAnimation({ threshold: 0.18 });

  return (
   <section
  id="about"
  className="relative w-full bg-[#050b08] overflow-hidden pt-[60px] pb-[120px] sm:pt-[80px] sm:pb-[150px] md:pt-[100px] md:pb-[200px] lg:pt-[100px] lg:pb-[200px]"
>
      <div
        ref={ref}
        className={`w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 xl:px-20 relative transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col md:block w-full">
          {/* Top Left Images Group */}
          <div className="flex items-start gap-4 mb-12 md:mb-0 md:absolute md:top-0 md:left-10 lg:left-16 xl:left-20 z-10">
            <div className="relative w-[160px] h-[160px] md:w-[180px] md:h-[280px] lg:w-[200px] lg:h-[200px] rounded-xl lg:rounded-2xl overflow-hidden shrink-0">
              <Image
                src="/Images/about/img1.svg"
                alt="Reset Life exterior"
               
                className="object-cover"
                height={200}
                width={200}
                priority
              />
            </div>
            <div className="relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px] rounded-lg lg:rounded-xl overflow-hidden shrink-0">
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
          <div className="relative z-20 w-full max-w-[900px] mx-auto flex flex-col md:pt-[100px] lg:pt-[140px] md:pb-[80px] lg:pb-[120px]">
           
           <div className="flex flex-col mt-[40px] md:mt-[50px] lg:mt-[93px]">
            <div className="flex flex-col w-full self-center">
              <p className="about-text-main font-['BaskervvilleSC'] font-semibold text-[14px] sm:text-[18px] tracking-[0.2em] uppercase mb-6 text-center md:text-right w-full pr-0 md:pr-4 lg:pr-10">
                About
              </p>
              <h2 className="text-white font-['dtnightingale'] font-light text-[38px] leading-[100%] tracking-[0%] text-right">
                Reset Life is a peaceful escape designed to help you slow down,
                breathe deeply, and reconnect with what truly matters.
                Surrounded by nature and away from the noise of everyday life,
                it sets the perfect tone for an unhurried stay.
              </h2>
          
            
            </div>
                  {/* Bottom Right Image */}
          <div className="w-full flex justify-end mt-[40px] md:mt-[50px] lg:mt-[60px]">
            <div className="relative w-[240px] h-[320px] md:w-[260px] md:h-[360px] lg:w-[280px] lg:h-[400px] rounded-xl lg:rounded-2xl overflow-hidden">
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
  );
}
