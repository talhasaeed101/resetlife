"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assets } from "@/lib/assets";
import { PAGE_NAV_LINKS, ROUTES } from "@/lib/site";
import { MobileMenu } from "@/components/MobileMenu";

type SiteHeaderProps = {
  variant?: "page" | "overlay";
};

export function SiteHeader({ variant = "page" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.documentElement.style.overflowX = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflowX = "";
    };
  }, [menuOpen]);

  const headerClassName =
    variant === "overlay"
      ? "site-header-fixed site-header-layer"
      : "site-header-page";

  return (
    <>
      <div className={headerClassName}>
        <header className="site-header-inner mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-5 py-5 sm:px-8 md:px-10 lg:px-16 xl:px-20">
          <Link
            href={ROUTES.home}
            className="flex items-end gap-[9px]"
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

          <nav
            className="hidden items-center gap-8 xl:flex"
            aria-label="Primary navigation"
          >
            {PAGE_NAV_LINKS.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href === ROUTES.villa && pathname === ROUTES.villa);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-['Raleway'] text-[15px] transition-colors ${
                    isActive ? "text-white" : "text-[#8e8e8e] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.reservation}
              className="gold-button-luxury hidden rounded-[12px] px-5 py-3 font-['BaskervvilleSC'] text-[14px] font-semibold text-[#050b08] sm:inline-flex"
            >
              Book Now
            </Link>

            <div className="relative xl:hidden">
              <button
                type="button"
                className="glass-surface flex items-center gap-[6px] rounded-[12px] px-3 py-2"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="site-navigation-menu"
                aria-haspopup="dialog"
                onClick={() => setMenuOpen((open) => !open)}
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
              <MobileMenu
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                mode="page"
              />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
