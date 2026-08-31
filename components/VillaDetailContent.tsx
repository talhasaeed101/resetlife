"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { ROUTES, SITE } from "@/lib/site";
import { MobileMenu, SiteLogoLink } from "@/components/MobileMenu";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/* ── Info tile icons ─────────────────────────────────────── */
function SizeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 9H15M9 12H15M9 15H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function OccupancyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 20C3 17 5.686 15 9 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 20C11 17.8 13.1 16 16 16C18.9 16 21 17.8 21 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function BedIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 9V18M21 9V18M3 14H21M3 9C3 7.343 4.343 6 6 6H18C19.657 6 21 7.343 21 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 9V10M17 9V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function BathIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12H19V16C19 18.761 16.761 21 14 21H10C7.239 21 5 18.761 5 16V12ZM5 12V9C5 7.343 6.343 6 8 6H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function FeatureIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 9L12 3L21 9V20C21 20.552 20.552 21 20 21H4C3.448 21 3 20.552 3 20V9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21V12H15V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ViewIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M1 12C1 12 5 5 12 5C19 5 23 12 23 12C23 12 19 19 12 19C5 19 1 12 1 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const INFO_TILES = [
  { icon: <SizeIcon />, label: "Size", value: "4,500 sq ft" },
  { icon: <OccupancyIcon />, label: "Occupancy", value: "Up to 15 guests" },
  { icon: <BedIcon />, label: "Beds", value: "4 King-size bedrooms" },
  { icon: <BathIcon />, label: "Bathrooms", value: "4 full bathrooms" },
  {
    icon: <FeatureIcon />,
    label: "Unique Features",
    value: "Private pool & outdoor lounge",
  },
  { icon: <ViewIcon />, label: "View", value: "Gardens & open sky" },
] as const;

const AMENITIES_COLS = [
  [
    "Private swimming pool",
    "Lush green lawns",
    "Outdoor lounge area",
    "Secure boundary & gate",
    "Ample parking space",
  ],
  [
    "Fully equipped kitchen",
    "Living & dining spaces",
    "Air-conditioned rooms",
    "Hot & cold water supply",
    "BBQ / outdoor cooking area",
  ],
  [
    "High-speed WiFi",
    "LED TV in all rooms",
    "24 / 7 caretaker on-site",
    "Backup generator",
    "Event decor setup (on request)",
  ],
] as const;

const BENEFITS = [
  "As a guest at Reset Life Farmhouse, you'll enjoy exclusive access to the private pool and all outdoor areas throughout your stay.",
  "The farmhouse is ideal for family retreats, birthday celebrations, Nikkah ceremonies, photography shoots, and corporate off-sites.",
  "A dedicated on-site caretaker is available around the clock to assist with any requirements during your stay.",
  "Children can play freely in the secured lawn spaces, while adults relax in the lounge or by the poolside.",
  "The fully equipped kitchen lets you prepare your own meals, or you may arrange outside catering for events.",
  "Complimentary high-speed WiFi and a backup generator ensure a connected, uninterrupted stay at all times.",
  "Event setup assistance and decor coordination are available on request for weddings, birthdays, and corporate gatherings.",
] as const;

export default function VillaDetailContent() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.documentElement.style.overflowX = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflowX = "";
    };
  }, [menuOpen]);

  return (
    <div className="vd-page">
      {/* ── Navbar matching Home Page ──────────────────────── */}

      <div
        className={`site-header-fixed ${menuOpen ? "site-header-layer--menu-open" : ""}`}
      >
        <header className="site-header-inner site-header-layer mx-auto flex w-full max-w-[1440px] items-start justify-between px-5 py-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xl:py-0">
          <SiteLogoLink />

          <div className="relative">
            <button
              type="button"
              className="relative flex items-center gap-[6px] rounded-full px-4 py-2 sm:px-5 sm:py-2.5"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-navigation-menu"
              aria-haspopup="dialog"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Image
                src={assets.hero.menuButtonBg}
                alt=""
                fill
                sizes="160px"
                className="pointer-events-none object-fill"
                aria-hidden
              />
              <span className="relative z-10 font-['dtnightingale'] text-[14px] capitalize tracking-[1.6px] text-white sm:text-[16px]">
                Menu
              </span>
              <Image
                src={assets.hero.menuIcon}
                alt=""
                width={28}
                height={28}
                className="relative z-10 h-6 w-6 sm:h-7 sm:w-7"
              />
            </button>
            <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          </div>
        </header>
      </div>
      {/* ── Hero image ────────────────────────────────── */}
      <section className="vd-hero">
        <div className="vd-hero__media">
          <Image
            src={assets.villa.main}
            alt="Reset Life Farmhouse"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="vd-body">
        {/* Breadcrumb */}
        {/* <nav className="vd-breadcrumb" aria-label="Breadcrumb">
          <Link href={ROUTES.home}>Home</Link>
          <span aria-hidden>/</span>
          <span>Villa Detail</span>
        </nav> */}

        {/* Description */}
        <p className="vd-description">
          As soon as you step into Hidden Oasis Resort, you'll feel inspired by
          the beauty of our beach resort. Our Classic Rooms are designed in a
          traditional Vietnamese style and feature unique touches that will
          delight you at every turn. Relax in the comfortable indoor-outdoor
          living areas and enjoy the refreshing sea breeze. You can also indulge
          in the oversized marble tub or unwind on the extra-comfortable king or
          queen beds. And, if you're in the mood for some socializing, invite
          your friends over for evening drinks on your terrace overlooking the
          lush gardens and sparkling sea.
        </p>

        {/* Info grid */}
        <div className="vd-info-grid">
          {INFO_TILES.map((tile) => (
            <div key={tile.label} className="vd-info-tile">
              <span className="vd-info-tile__icon">{tile.icon}</span>
              <span className="vd-info-tile__label">{tile.label}</span>
              <span className="vd-info-tile__value">{tile.value}</span>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <section className="vd-section">
          <h2 className="vd-section__title">Amenities</h2>
          <div className="vd-amenities-box">
            {AMENITIES_COLS.map((col, ci) => (
              <ul key={ci} className="vd-amenities-col">
                {col.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="vd-section">
          <h2 className="vd-section__title">Benefits</h2>
          <div className="vd-benefits-box">
            <ul className="vd-benefits-list">
              {BENEFITS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA button */}
        <div className="vd-reserve-row">
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vd-reserve-btn"
          >
            MAKE A RESERVATION
          </a>
        </div>
      </div>

      <CTA />
      <Footer />
    </div>
  );
}
