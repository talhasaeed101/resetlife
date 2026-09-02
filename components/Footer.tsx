"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assets } from "@/lib/assets";
import {
  EVENT_LINKS,
  NAV_LINKS,
  ROUTES,
  SECTION_IDS,
  SITE,
} from "@/lib/site";
import { navigateToSection } from "@/lib/scroll";



function SectionLink({
  label,
  sectionId,
}: {
  label: string;
  sectionId: (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
}) {
  const pathname = usePathname();

  return (
    <button
      type="button"
      onClick={() => navigateToSection(sectionId, pathname)}
      className="footer-link"
    >
      {label}
    </button>
  );
}

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="footer-premium">
      <div className="footer-premium__inner">
        {/* Brand / Logo */}
        <div className="footer-brand-row">
          <Link
            href={ROUTES.home}
            onClick={(event) => {
              event.preventDefault();
              navigateToSection("hero", pathname);
            }}
            className="footer-brand"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src={assets.hero.logoIcon}
              alt=""
              width={28}
              height={40}
              className="h-9 w-[24px] sm:h-10 sm:w-[27.922px]"
            />
            <span className="text-gradient-farm font-['BaskervvilleSC'] text-[20px] uppercase leading-none tracking-[2px] sm:text-[24px] sm:tracking-[2.4px]">
              {SITE.shortName}
            </span>
          </Link>
        </div>

        <div className="footer-premium__divider" aria-hidden />

        {/* Info Row: Location | Contact | Email */}
        <div className="footer-info-row">
          <div className="footer-info-col">
            <h3 className="footer-column-heading">Location</h3>
            <p className="footer-copy">{SITE.address}</p>
          </div>
          <div className="footer-info-col">
            <h3 className="footer-column-heading">Contact</h3>
            <a href={`tel:${SITE.phone}`} className="footer-copy footer-copy--link">
              {SITE.phoneDisplay}
            </a>
          </div>
          <div className="footer-info-col">
            <h3 className="footer-column-heading">Email</h3>
            <a href={SITE.emailMailto} className="footer-copy footer-copy--link footer-email">
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="footer-premium__divider" aria-hidden />

        {/* Nav Row: Navigation | Events | Follow Us On */}
        <div className="footer-nav-row">
          <div className="footer-nav-col">
            <h3 className="footer-column-heading">Navigation</h3>
            <nav className="footer-nav">
              {NAV_LINKS.map((link) => (
                <SectionLink
                  key={link.label}
                  label={link.label}
                  sectionId={link.sectionId}
                />
              ))}
            </nav>
          </div>

          <div className="footer-nav-col">
            <h3 className="footer-column-heading">Events</h3>
            <nav className="footer-nav">
              {EVENT_LINKS.map((link) => (
                <SectionLink
                  key={link.label}
                  label={link.label}
                  sectionId={SECTION_IDS.events}
                />
              ))}
            </nav>
          </div>

          <div className="footer-nav-col footer-nav-col--social">
            <h3 className="footer-column-heading">Follow Us On</h3>
            <div className="footer-social-icons">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn11"
                aria-label="Instagram"
              >
                <Image src="/Images/Footer/insta.svg" alt="Instagram" width={20} height={20} />
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn11"
                aria-label="TikTok"
              >
                <Image src="/Images/Footer/tiktok.svg" alt="TikTok" width={20} height={20} />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn11"
                aria-label="Facebook"
              >
                <Image src="/Images/Footer/facebook.svg" alt="Facebook" width={20} height={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-premium__divider footer-premium__divider--subtle" aria-hidden />

        {/* Legal bar */}
        <div className="footer-premium__legal">
          <p className="footer-copy">
            &copy;2025 {SITE.name}. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <Link href="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
