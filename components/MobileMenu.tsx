"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { NAV_LINKS, type SectionId } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const mounted = useIsClient();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavClick = (sectionId: SectionId) => {
    onClose();
    window.setTimeout(() => scrollToSection(sectionId), 150);
  };

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] xl:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div className="pointer-events-none absolute inset-0 flex justify-end px-5 pt-6 sm:px-8">
        <div className="pointer-events-auto w-[min(320px,calc(100vw-2.5rem))]">
          <div className="glass-surface glass-panel rounded-[16px] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.45)]">
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
                className="rounded-[8px] border border-white/15 bg-white/5 px-3 py-1.5 font-['Raleway'] text-[14px] text-white transition-colors hover:bg-white/10"
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
    </div>,
    document.body,
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
