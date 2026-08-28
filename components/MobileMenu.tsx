"use client";

import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { NAV_LINKS, type SectionId } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) {
    return null;
  }

  const handleNavClick = (sectionId: SectionId) => {
    onClose();
    window.setTimeout(() => scrollToSection(sectionId), 150);
  };

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div className="absolute right-5 top-6 w-[min(320px,calc(100vw-2.5rem))] sm:right-8">
        <div className="glass-surface rounded-[16px] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-end gap-[9px]">
              <Image
                src={assets.hero.logoIcon}
                alt="Reset Life"
                width={28}
                height={40}
                className="h-8 w-[22px]"
              />
              <span className="text-gradient-farm font-['BaskervvilleSC'] text-[18px] uppercase tracking-[2px]">
                Reset life
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="font-['Raleway'] text-[14px] text-white"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.sectionId)}
                className="text-left font-['Raleway'] text-[16px] text-[#8e8e8e] transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export function SiteLogoLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="#hero"
      onClick={(event) => {
        event.preventDefault();
        scrollToSection("hero");
      }}
      className={`flex items-end gap-[9px] ${className}`}
      aria-label="Reset Life home"
    >
      <Image
        src={assets.hero.logoIcon}
        alt=""
        width={28}
        height={40}
        className="h-8 w-[22px] sm:h-10 sm:w-[27.922px]"
      />
      <span className="text-gradient-farm font-['BaskervvilleSC'] text-[18px] uppercase tracking-[2px] sm:text-[24px] sm:tracking-[2.4px]">
        Reset life
      </span>
    </Link>
  );
}
