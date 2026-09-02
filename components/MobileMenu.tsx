"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assets } from "@/lib/assets";
import { DROPDOWN_NAV_LINKS, ROUTES, type SectionId } from "@/lib/site";
import { navigateToSection } from "@/lib/scroll";

export const SITE_MENU_TRIGGER_ID = "site-menu-trigger";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

type MenuPosition = {
  top: number;
  right: number;
};

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function getMenuPosition(): MenuPosition | null {
  const trigger = document.getElementById(SITE_MENU_TRIGGER_ID);
  if (!trigger) {
    return null;
  }

  const rect = trigger.getBoundingClientRect();
  return {
    top: rect.bottom + 8,
    right: Math.max(12, window.innerWidth - rect.right),
  };
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const mounted = useIsClient();
  const pathname = usePathname();
  const [position, setPosition] = useState<MenuPosition | null>(null);

  useLayoutEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    setPosition(getMenuPosition());
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePosition = () => {
      setPosition(getMenuPosition());
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavClick = (sectionId: SectionId) => {
    document.body.style.overflow = "";
    document.documentElement.style.overflowX = "";
    navigateToSection(sectionId, pathname);
    onClose();
  };

  const handleBookNowClick = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflowX = "";
    onClose();
    window.location.href = ROUTES.reservation;
  };

  if (!isOpen || !mounted || !position) {
    return null;
  }

  const panelStyle: CSSProperties = {
    top: position.top,
    right: position.right,
  };

  return createPortal(
    <>
      <button
        type="button"
        className="mobile-menu-backdrop"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div
        id="site-navigation-menu"
        className="mobile-menu-panel mobile-menu-panel--portal glass-effect"
        style={panelStyle}
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
          {DROPDOWN_NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.sectionId)}
              className="mobile-menu-link"
            >
              {link.label}
            </button>
          ))}
          {/* <button
            type="button"
            onClick={handleBookNowClick}
            className="mobile-menu-link"
          >
            Book Now
          </button> */}
        </nav>
      </div>
    </>,
    document.body,
  );
}

export function SiteLogoLink({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.body.style.overflow = "";
    document.documentElement.style.overflowX = "";
    navigateToSection("hero", pathname);
  };

  return (
    <Link
      href={ROUTES.home}
      onClick={handleClick}
      className={`flex items-end gap-[9px] ${className}`}
      aria-label="Reset Life home"
    >
      <Image
        src={assets.hero.logoIcon}
        alt=""
        width={40}
        height={40}
        className="h-8 w-8 sm:h-10 sm:w-10"
      />
      <span className="text-gradient-farm font-['BaskervvilleSC'] text-[18px] uppercase tracking-[2px] sm:text-[24px] sm:tracking-[2.4px]">
        Reset life
      </span>
    </Link>
  );
}
