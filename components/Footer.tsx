import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";

const navigationLinks = ["Home", "About", "Villa", "Gallery"] as const;
const eventLinks = [
  "Nikkah",
  "Photography",
  "Birthday",
  "Corporate Events",
] as const;

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="white"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="white" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16.5 5.5C15.8 4.6 15.4 3.5 15.4 2.3H12.4V15.2C12.4 16.8 11.1 18.1 9.5 18.1C7.9 18.1 6.6 16.8 6.6 15.2C6.6 13.6 7.9 12.3 9.5 12.3C9.8 12.3 10.1 12.4 10.4 12.5V9.4C10.1 9.3 9.8 9.3 9.5 9.3C6.2 9.3 3.6 11.9 3.6 15.2C3.6 18.5 6.2 21.1 9.5 21.1C12.8 21.1 15.4 18.5 15.4 15.2V8.7C16.5 9.5 17.9 10 19.4 10V7C18.1 7 17.1 6.4 16.5 5.5Z"
        fill="white"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 8.5H16.5L17 5.5H14V3.5C14 2.67 14 1.5 16 1.5H17V5H15.5C14.67 5 14 5.67 14 6.5V8.5H17L16.5 11.5H14V22.5H10.5V11.5H8V8.5H10.5V6C10.5 3.79 12.29 2 14.5 2H17V5H15.5C14.67 5 14 5.67 14 6.5V8.5Z"
        fill="white"
      />
    </svg>
  );
}

function FooterColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-['BaskervvilleSC'] text-[15px] font-semibold uppercase leading-none tracking-[0.08em] text-white sm:text-[16px]">
      {children}
    </h3>
  );
}

function FooterColumn({
  topHeading,
  topContent,
  bottomHeading,
  bottomContent,
}: {
  topHeading: ReactNode;
  topContent: ReactNode;
  bottomHeading: ReactNode;
  bottomContent: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 xl:mb-[56px]">
        {topHeading}
        {topContent}
      </div>
      <div className="flex flex-col gap-4">
        {bottomHeading}
        {bottomContent}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050b08] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col pt-12 sm:pt-16 xl:h-[729px] xl:pt-[100px]">
        <div className="mb-10 flex items-end gap-[9px] sm:mb-12 xl:mb-[60px]">
          <Image
            src={assets.hero.logoIcon}
            alt="Reset Life"
            width={28}
            height={40}
            className="h-8 w-[22px] sm:h-10 sm:w-[27.922px]"
          />
          <span className="text-gradient-farm font-['BaskervvilleSC'] text-[20px] font-normal uppercase leading-none tracking-[2px] sm:text-[24px] sm:tracking-[2.4px]">
            Reset life
          </span>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-10 sm:mb-12 md:grid-cols-2 md:gap-x-12 md:gap-y-10 xl:mb-auto xl:grid-cols-3 xl:gap-0">
          <FooterColumn
            topHeading={<FooterColumnHeading>Location</FooterColumnHeading>}
            topContent={
              <p className="max-w-[320px] font-['Raleway'] text-[15px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]">
                Reset Life Retreat, Plot 12, Street 8, Block C, Gulberg Greens,
                Islamabad, Pakistan
              </p>
            }
            bottomHeading={<FooterColumnHeading>Navigation</FooterColumnHeading>}
            bottomContent={
              <nav className="flex flex-col gap-3 sm:gap-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="font-['Raleway'] text-[15px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            }
          />

          <FooterColumn
            topHeading={<FooterColumnHeading>Contact</FooterColumnHeading>}
            topContent={
              <a
                href="tel:+921234567890"
                className="font-['Raleway'] text-[15px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]"
              >
                +92 123 4567890
              </a>
            }
            bottomHeading={<FooterColumnHeading>Events</FooterColumnHeading>}
            bottomContent={
              <nav className="flex flex-col gap-3 sm:gap-4">
                {eventLinks.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="font-['Raleway'] text-[15px] font-normal leading-normal text-[#8e8e8e] sm:text-[16px]"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            }
          />

          <FooterColumn
            topHeading={<FooterColumnHeading>Email</FooterColumnHeading>}
            topContent={
              <a
                href="mailto:resetlife@gmail.com"
                className="break-all font-['Raleway'] text-[15px] font-normal leading-normal text-[#8e8e8e] sm:break-normal sm:text-[16px]"
              >
                resetlife@gmail.com
              </a>
            }
            bottomHeading={<FooterColumnHeading>Follow Us On</FooterColumnHeading>}
            bottomContent={
              <div className="flex items-center gap-5 sm:gap-6">
                <a href="#" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" aria-label="TikTok">
                  <TikTokIcon />
                </a>
                <a href="#" aria-label="Facebook">
                  <FacebookIcon />
                </a>
              </div>
            }
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 pb-8 sm:flex-row sm:items-center sm:gap-6 xl:pt-[60px] xl:pb-[40px]">
          <p className="font-['Raleway'] text-[13px] font-normal leading-normal text-[#8e8e8e] sm:text-[14px]">
            &copy;2025 Reset Life. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <Link
              href="#"
              className="font-['Raleway'] text-[13px] font-normal leading-normal text-[#8e8e8e] sm:text-[14px]"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="font-['Raleway'] text-[13px] font-normal leading-normal text-[#8e8e8e] sm:text-[14px]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
