"use client";

import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import {
  EVENT_LINKS,
  NAV_LINKS,
  SECTION_IDS,
  SITE,
} from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";
import type { ReactNode } from "react";

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.35 3.45 16.84L2 22L7.3 20.59C8.73 21.38 10.36 21.81 12.04 21.81C17.5 21.81 21.95 17.36 21.95 11.9C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.03L7.55 18.83L4.43 19.65L5.26 16.61L5.05 16.29C4.24 14.98 3.8 13.45 3.8 11.89C3.81 7.35 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 12.99 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.14 9.61 11.02 9.73 10.9C9.84 10.79 10.01 10.58 10.13 10.44C10.25 10.31 10.31 10.24 10.39 10.08C10.47 9.91 10.43 9.78 10.37 9.65C10.31 9.53 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.35C8.86 7.35 8.7 7.33 8.53 7.33Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FooterColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="footer-column-heading">{children}</h3>
  );
}

function SectionLink({
  label,
  sectionId,
}: {
  label: string;
  sectionId: (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(sectionId)}
      className="footer-link"
    >
      {label}
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="footer-premium">
      <div className="footer-premium__inner">
        <div className="footer-premium__brand-row">
          <Link
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("hero");
            }}
            className="footer-brand"
            aria-label="Reset Life home"
          >
            <Image
              src={assets.hero.logoIcon}
              alt=""
              width={28}
              height={40}
              className="h-9 w-[24px] sm:h-10 sm:w-[27.922px]"
            />
            <span className="text-gradient-farm font-['BaskervvilleSC'] text-[20px] uppercase leading-none tracking-[2px] sm:text-[24px] sm:tracking-[2.4px]">
              Reset life
            </span>
          </Link>

          <div className="footer-contact-actions">
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-whatsapp"
              aria-label="Chat with Reset Life Farmhouse on WhatsApp"
            >
              <WhatsAppIcon />
              <span>{SITE.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        <div className="footer-premium__divider" aria-hidden />

        <div className="footer-premium__grid">
          <div className="footer-premium__column">
            <FooterColumnHeading>Location</FooterColumnHeading>
            <p className="footer-copy">{SITE.address}</p>
          </div>

          <div className="footer-premium__column">
            <FooterColumnHeading>Navigation</FooterColumnHeading>
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

          <div className="footer-premium__column">
            <FooterColumnHeading>Contact</FooterColumnHeading>
            <div className="footer-contact-stack">
              <a href={SITE.emailMailto} className="footer-link footer-email">
                {SITE.email}
              </a>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link footer-whatsapp-inline"
                aria-label="Chat with Reset Life Farmhouse on WhatsApp"
              >
                WhatsApp: {SITE.whatsappDisplay}
              </a>
              <a href={`tel:${SITE.phone}`} className="footer-link">
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="footer-premium__column">
            <FooterColumnHeading>Events</FooterColumnHeading>
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

          <div className="footer-premium__column">
            <FooterColumnHeading>Follow Us</FooterColumnHeading>
            <div className="footer-social">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={`${SITE.instagramLabel} on Instagram`}
                title={SITE.instagramHandle}
              >
                <InstagramIcon />
                <span>{SITE.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-premium__divider footer-premium__divider--subtle" aria-hidden />

        <div className="footer-premium__legal">
          <p className="footer-copy">
            &copy;2025 Reset Life. All rights reserved.
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
