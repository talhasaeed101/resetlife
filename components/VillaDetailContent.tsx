"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { storeReservationPrefill } from "@/lib/reservation";
import { GUEST_OPTIONS, ROUTES, SITE } from "@/lib/site";
import {
  VILLA_AMENITIES,
  VILLA_EXPERIENCE_COPY,
  VILLA_EXPERIENCE_TITLE,
  VILLA_GALLERY_IMAGES,
  VILLA_HERO_EYEBROW,
  VILLA_HERO_TITLE,
  VILLA_PRICE_LABEL,
  VILLA_RULES,
} from "@/lib/villa";
import { GoldButton } from "@/components/ui/GoldButton";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { AmenityIcon } from "@/components/villa/AmenityIcon";

type SidebarState = {
  guests: string;
  checkIn: string;
  checkOut: string;
};

const initialSidebarState: SidebarState = {
  guests: "",
  checkIn: "",
  checkOut: "",
};

export default function VillaDetailContent() {
  const router = useRouter();
  const [sidebar, setSidebar] = useState<SidebarState>(initialSidebarState);
  const galleryRef = useRef<HTMLDivElement>(null);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const openDatePicker = (input: HTMLInputElement | null) => {
    if (!input) {
      return;
    }

    input.focus();

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
      } catch {
        input.click();
      }
    }
  };

  const updateSidebar = (field: keyof SidebarState, value: string) => {
    setSidebar((current) => ({ ...current, [field]: value }));
  };

  const handleReserve = () => {
    storeReservationPrefill({
      guests: sidebar.guests,
      checkIn: sidebar.checkIn,
      checkOut: sidebar.checkOut,
    });
    router.push(ROUTES.reservation);
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#050b08]">
      <SiteHeader variant="overlay" />

      <section className="villa-detail-hero">
        <div className="villa-detail-hero__media">
          <Image
            src={assets.villa.main}
            alt="Reset Life Farmhouse pool and exterior at night"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="villa-detail-hero__overlay" aria-hidden />
        </div>

        <div className="villa-detail-hero__content">
          <p className="villa-detail-hero__eyebrow">{VILLA_HERO_EYEBROW}</p>
          <h1 className="villa-detail-hero__title">{VILLA_HERO_TITLE}</h1>
          <button
            type="button"
            onClick={scrollToGallery}
            className="villa-detail-hero__gallery-btn"
          >
            View Gallery
          </button>
        </div>
      </section>

      <div className="villa-detail-body">
        <nav className="villa-detail-breadcrumbs" aria-label="Breadcrumb">
          <Link href={ROUTES.home}>Home</Link>
          <span aria-hidden>/</span>
          <Link href={ROUTES.villa}>Villa</Link>
          <span aria-hidden>/</span>
          <span>Villa Details</span>
        </nav>

        <div className="villa-detail-layout">
          <div className="villa-detail-main">
            <section className="villa-detail-section">
              <h2 className="villa-detail-section__title">{VILLA_EXPERIENCE_TITLE}</h2>
              <div className="villa-detail-section__copy">
                {VILLA_EXPERIENCE_COPY.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="villa-detail-section">
              <h2 className="villa-detail-section__title">Key Amenities</h2>
              <div className="villa-detail-amenities">
                {VILLA_AMENITIES.map((amenity) => (
                  <div key={amenity.label} className="villa-detail-amenity">
                    <span className="villa-detail-amenity__icon">
                      <AmenityIcon name={amenity.icon} />
                    </span>
                    <span className="villa-detail-amenity__label">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section ref={galleryRef} id="villa-gallery" className="villa-detail-section">
              <h2 className="villa-detail-section__title">Interior Gallery</h2>
              <div className="villa-detail-gallery">
                {VILLA_GALLERY_IMAGES.map((image) => (
                  <div key={image.src} className="villa-detail-gallery__item">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="villa-detail-section">
              <h2 className="villa-detail-section__title">Rules &amp; Policy</h2>
              <ul className="villa-detail-rules">
                {VILLA_RULES.map((rule) => (
                  <li key={rule.label}>
                    <span>{rule.label}</span>
                    <span>{rule.value}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="villa-detail-sidebar">
            <div className="booking-card villa-detail-booking-card">
              <p className="villa-detail-booking-card__price">{VILLA_PRICE_LABEL}</p>

              <div className="villa-detail-booking-card__fields">
                <div className="villa-detail-field">
                  <label htmlFor="villa-check-in" className="booking-field-label">
                    Check-in
                  </label>
                  <div className="villa-detail-field__control">
                    <input
                      id="villa-check-in"
                      ref={checkInRef}
                      type="date"
                      value={sidebar.checkIn}
                      onChange={(event) => updateSidebar("checkIn", event.target.value)}
                      onClick={() => openDatePicker(checkInRef.current)}
                      className="villa-detail-field__input"
                    />
                    <button
                      type="button"
                      className="villa-detail-field__icon-btn"
                      aria-label="Open check-in calendar"
                      onClick={() => openDatePicker(checkInRef.current)}
                    >
                      <Image
                        src={assets.hero.calendar}
                        alt=""
                        width={20}
                        height={20}
                        className="villa-detail-field__icon"
                      />
                    </button>
                  </div>
                </div>

                <div className="villa-detail-field">
                  <label htmlFor="villa-check-out" className="booking-field-label">
                    Check-out
                  </label>
                  <div className="villa-detail-field__control">
                    <input
                      id="villa-check-out"
                      ref={checkOutRef}
                      type="date"
                      value={sidebar.checkOut}
                      onChange={(event) => updateSidebar("checkOut", event.target.value)}
                      onClick={() => openDatePicker(checkOutRef.current)}
                      className="villa-detail-field__input"
                    />
                    <button
                      type="button"
                      className="villa-detail-field__icon-btn"
                      aria-label="Open check-out calendar"
                      onClick={() => openDatePicker(checkOutRef.current)}
                    >
                      <Image
                        src={assets.hero.calendar}
                        alt=""
                        width={20}
                        height={20}
                        className="villa-detail-field__icon"
                      />
                    </button>
                  </div>
                </div>

                <div className="villa-detail-field">
                  <label htmlFor="villa-guests" className="booking-field-label">
                    Guests
                  </label>
                  <div className="villa-detail-field__control">
                    <select
                      id="villa-guests"
                      value={sidebar.guests}
                      onChange={(event) => updateSidebar("guests", event.target.value)}
                      className={`villa-detail-field__input ${!sidebar.guests ? "is-placeholder" : ""}`}
                    >
                      <option value="">Choose</option>
                      {GUEST_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <Image
                      src={assets.hero.arrowDown}
                      alt=""
                      width={20}
                      height={20}
                      className="villa-detail-field__icon"
                    />
                  </div>
                </div>
              </div>

              <GoldButton type="button" className="mt-6 w-full" onClick={handleReserve}>
                RESERVE
              </GoldButton>

              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="villa-detail-booking-card__whatsapp"
              >
                WhatsApp Us
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
