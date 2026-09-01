"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import {
  DROPDOWN_NAV_LINKS,
  PAGE_NAV_LINKS,
  ROUTES,
  type SectionId,
} from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  mode?: "home" | "page";
};

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function MobileMenu({ isOpen, onClose, mode = "home" }: MobileMenuProps) {
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

  return (
    <>
      {createPortal(
        <button
          type="button"
          className="mobile-menu-backdrop"
          aria-label="Close menu"
          onClick={onClose}
        />,
        document.body,
      )}

      <div
        id="site-navigation-menu"
        className="mobile-menu-panel glass-effect"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          type="button"
          onClick={onClose}
          className="sr-only mobile-menu-close"
          aria-label="Close menu"
        >
          Close
        </button>

        <nav className="mobile-menu-panel__nav">
          {mode === "page"
            ? PAGE_NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="mobile-menu-link"
                >
                  {link.label}
                </Link>
              ))
            : DROPDOWN_NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.sectionId)}
                  className="mobile-menu-link"
                >
                  {link.label}
                </button>
              ))}
          {mode === "page" ? (
            <Link
              href={ROUTES.reservation}
              onClick={onClose}
              className="mobile-menu-link"
            >
              Book Now
            </Link>
          ) : null}
        </nav>
      </div>
    </>
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
