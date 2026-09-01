"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { ROUTES } from "@/lib/site";
import { MobileMenu, SITE_MENU_TRIGGER_ID, SiteLogoLink } from "@/components/MobileMenu";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/* ── Info tile icons ─────────────────────────────────────── */
const INFO_TILES = [
  { icon: <Image src="/Images/villadetail/i1.svg" width={35} height={35} alt="Size" />, label: "Size", value: "70 sqm (750 sq ft)" },
  { icon: <Image src="/Images/villadetail/i2.svg" width={35} height={35} alt="Occupancy" />, label: "Occupancy", value: "Up to three adults and two children under 12 years" },
  { icon: <Image src="/Images/villadetail/i3.svg" width={35} height={35} alt="Beds" />, label: "Beds", value: "King bed or two twin beds" },
  { icon: <Image src="/Images/villadetail/i4.svg" width={35} height={35} alt="Bathrooms" />, label: "Bathrooms", value: "Double vanities, rain shower, separate marble tub" },
  {
    icon: <Image src="/Images/villadetail/i5.svg" width={35} height={35} alt="Unique Features" />,
    label: "Unique Features",
    value: "Terrace with outdoor seating",
  },
  { icon: <Image src="/Images/villadetail/i6.svg" width={35} height={35} alt="View" />, label: "View", value: "Sea and gardens" },
] as const;

const AMENITIES_COLS = [
  [
    "Ocean views",
    "Private pool",
    "Timber sun deck",
    "King-size bed",
  ],
  [
    "Living area with sofa, writing desk",
    "Bathroom with bathtub, twin vanities",
    "Separate shower/toilet",
    "Sun deck with sun loungers",
  ],
  [
    "WiFi, TV, Netflix, Bose sound system, safe",
    "Personal bar",
  ],
] as const;

const BENEFITS = [
  "As a guest staying in a Classic Room at Hidden Oasis Resort, you will enjoy exclusive access to our stunning beach and all of its associated amenities, including exciting beach games.",
  "In addition, there are plenty of recreational activities available for you to participate in, such as non-motorized water sports (such as kayaking, sailing, and stand-up paddleboarding), as well as tennis courts, beach games, and daily yoga and tai chi classes.",
  "For those who want to stay fit and healthy during their stay, our state-of-the-art Soar Gym fitness center is available to use at any time.",
  "Children under the age of six can enjoy complimentary meals from the Kid's Menu, while adults can relax and unwind with a game of billiards or table tennis at Long Bar.",
  "There's also something for animal lovers with our one-hour Wildlife Workshop, led by our resident zoologist.",
  "Movie enthusiasts can indulge in scheduled film screenings at our Cinema, and parents can relax knowing that their children are in good hands at our Planet Trekkers Kids Club.",
  "Guests who need to stay connected can take advantage of the business services available throughout the resort at our Business Center.",
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
        <header className="site-header-inner site-header-layer mx-auto flex w-full max-w-[1435px] items-start justify-between px-5 py-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xl:py-0">
          <SiteLogoLink />

          <div className="relative">
            <button
              id={SITE_MENU_TRIGGER_ID}
              type="button"
              className="menu-button-glass relative flex items-center gap-[6px] rounded-full px-4 py-2 sm:px-5 sm:py-2.5"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-navigation-menu"
              aria-haspopup="dialog"
              onClick={() => setMenuOpen((open) => !open)}
            >
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
              <div className="flex gap-[17px] items-center">
              <span className="vd-info-tile__icon">{tile.icon}</span>
              <span className="vd-info-tile__label">{tile.label}</span>
              </div>
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
          <Link href={ROUTES.reservation} className="vd-reserve-btn">
            MAKE A RESERVATION
          </Link>
        </div>
      </div>

      <CTA />
      <Footer />
    </div>
  );
}
