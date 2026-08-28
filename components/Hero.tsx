import React from "react";
import Image from "next/image";
const Hero = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url('/Images/homePage/Hero%20Section.png')` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 w-full px-20 py-10 flex justify-between items-center">
        <Image
          src="/Images/homePage/logo.svg"
          alt="Logo"
          width={198}
          height={40}
          className="object-contain"
        />

        {/* Menu Button */}
        <button
          className="rounded-[12px] bg-cover bg-center bg-no-repeat p-[12px] flex items-center justify-center gap-[6px] hover:opacity-90 transition-opacity"
          style={{
            backgroundImage: "url('/Images/homePage/Frame 2147239969.png')",
          }}
        >
          <span className="font-['dtnightingale'] font-light text-[16px] leading-[100%] tracking-[10%] capitalize text-white">
            Menu
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center mt-[-8vh]">
        <h1 className="font-['dtnightingale'] font-light text-[86px] leading-[84px] tracking-[0%] text-center text-white mb-5 drop-shadow-lg max-w-[671px]">
          Escape to Nature. Stay in Luxury.
        </h1>
        <p className="text-[#8E8E8E] font-['Raleway'] font-medium text-[24px] leading-[100%] tracking-[0%] text-center max-w-2xl px-4 drop-shadow-md">
          Relax, reconnect, and create unforgettable moments surrounded by
          nature and tranquility.
        </p>
      </div>

      {/* Booking Bar */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto mb-16 px-4">
        <div
          className="bg-cover bg-center bg-no-repeat rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl w-full"
          style={{
            backgroundImage: "url('/Images/homePage/ssq.png')",
          }}
        >
          
          <div className="flex-1 w-full flex flex-col gap-2 md:pr-8">
            <span className="text-white text-[18px] font-semibold tracking-[0.15em] font-['BaskervvilleSC']">
              Event Type
            </span>
            <div className="flex items-center justify-between cursor-pointer group mt-1">
              <span className="text-white/60 font-['Raleway'] text-sm group-hover:text-white transition-colors">
                Choose
              </span>
              <svg
                className="text-white/50 group-hover:text-white transition-colors"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-2 md:border-r border-white/10 md:pr-8 md:pl-2">
            <span className="text-white text-[13px] font-bold uppercase tracking-[0.15em] font-['BaskervvilleSC']">
              Guest(s)
            </span>
            <div className="flex items-center justify-between cursor-pointer group mt-1">
              <span className="text-white/60 font-['Raleway'] text-sm group-hover:text-white transition-colors">
                Choose
              </span>
              <svg
                className="text-white/50 group-hover:text-white transition-colors"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-2 md:border-r border-white/10 md:pr-8 md:pl-2">
            <span className="text-white text-[13px] font-bold uppercase tracking-[0.15em] font-['BaskervvilleSC']">
              Check-In Date
            </span>
            <div className="flex items-center justify-between cursor-pointer group mt-1">
              <span className="text-white/60 font-['Raleway'] text-sm group-hover:text-white transition-colors">
                dd- --- - yyyy
              </span>
              <svg
                className="text-white/50 group-hover:text-white transition-colors"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-2 md:pr-8 md:pl-2">
            {/* The screenshot shows Check-In Date twice, replicating exactly but logically fixing one if desired, sticking to exact screenshot text 'Check-In Date' based on the screenshot but let's use 'Check-Out Date' since it's the second date */}
            <span className="text-white text-[13px] font-bold uppercase tracking-[0.15em] font-['BaskervvilleSC']">
              Check-Out Date
            </span>
            <div className="flex items-center justify-between cursor-pointer group mt-1">
              <span className="text-white/60 font-['Raleway'] text-sm group-hover:text-white transition-colors">
                dd- --- - yyyy
              </span>
              <svg
                className="text-white/50 group-hover:text-white transition-colors"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
          </div>

          <div className="md:pl-4 w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0">
            <button className="w-full md:w-auto bg-gradient-to-r from-[#C29B62] to-[#B38D56] hover:from-[#d1ab73] hover:to-[#c49d66] text-black font-['BaskervvilleSC'] font-bold tracking-wider px-10 py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(179,141,86,0.3)] hover:shadow-[0_4px_25px_rgba(179,141,86,0.5)]">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
