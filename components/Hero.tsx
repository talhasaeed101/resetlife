"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/lib/assets";
import { storeReservationPrefill } from "@/lib/reservation";
import { EVENT_TYPES, GUEST_OPTIONS, ROUTES } from "@/lib/site";
import { GoldButton } from "@/components/ui/GoldButton";
import { useToast } from "@/components/ui/Toast";
import { BookingDatePicker, CustomDropdown } from "@/components/booking/BookingFields";
import { MobileMenu, SiteLogoLink } from "@/components/MobileMenu";
import { readBookingPrefill, clearBookingPrefill, BOOKING_PREFILL_EVENT } from "@/lib/scroll";
import { formatValidationToast, validateBookingForm } from "@/lib/validation";

type BookingState = {
  eventType: string;
  guests: string;
  checkIn: string;
  checkOut: string;
};

const initialBookingState: BookingState = {
  eventType: "",
  guests: "",
  checkIn: "",
  checkOut: "",
};

export default function Hero() {
  const router = useRouter();
  const toast = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState<BookingState>(initialBookingState);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.documentElement.style.overflowX = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflowX = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const applyPrefill = () => {
      const prefill = readBookingPrefill();
      if (!prefill) {
        return;
      }

      setBooking((current) => ({
        eventType: prefill.eventType ?? current.eventType,
        guests: prefill.guests ?? current.guests,
        checkIn: prefill.checkIn ?? current.checkIn,
        checkOut: prefill.checkOut ?? current.checkOut,
      }));
      clearBookingPrefill();
    };

    applyPrefill();
    window.addEventListener(BOOKING_PREFILL_EVENT, applyPrefill);
    return () => window.removeEventListener(BOOKING_PREFILL_EVENT, applyPrefill);
  }, []);

  const updateBooking = (field: keyof BookingState, value: string) => {
    setBooking((current) => ({ ...current, [field]: value }));
  };

  const handleBookingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateBookingForm(booking);
    if (Object.keys(validationErrors).length > 0) {
      const { title, message } = formatValidationToast(validationErrors);
      toast.error(title, message);
      return;
    }

    storeReservationPrefill({
      eventType: booking.eventType,
      guests: booking.guests,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    });
    toast.success(
      "Booking details saved",
      "Taking you to the villa details page.",
    );
    router.push(ROUTES.villa);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={assets.hero.background}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-black/60" aria-hidden />

      <div
        className={`site-header-fixed ${menuOpen ? "site-header-layer--menu-open" : ""}`}
      >
        <header className="site-header-inner site-header-layer mx-auto flex w-full max-w-[1440px] items-start justify-between px-5 py-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xl:py-0">
          <SiteLogoLink />

          <div className="relative">
            <button
              type="button"
              className="glass-effect relative flex items-center gap-[6px] px-4 py-2 sm:px-5 sm:py-2.5"
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

      <div className="h-[76px] w-full shrink-0 xl:hidden" aria-hidden />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-[20px] lg:gap-[25px] self-center px-5 py-8 text-center sm:px-8 md:px-10 xl:w-[671px]  xl:px-0 xl:py-10">
        <h1 className="font-['dtnightingale'] text-[36px] font-light leading-[1.05] tracking-[0.01em] text-white sm:text-[44px] md:text-[64px] lg:text-[72px] xl:text-[80px] xl:leading-[84px]">
          Escape to Nature. Stay in Luxury.
        </h1>
        <p className="max-w-[540px] font-['Raleway'] text-[24px] font-medium leading-snug text-[#8e8e8e] sm:text-[18px] md:text-[20px] xl:max-w-none xl:text-[24px] xl:leading-none">
          Relax, reconnect, and create unforgettable moments surrounded by
          nature and tranquility.
        </p>
      </div>

      <div className="relative z-30 mx-auto w-full max-w-[1280px] shrink-0 px-5 pb-8 pt-2 sm:px-8 md:px-10 lg:px-16 xl:px-0 xl:pb-[63px]">
        <form
          onSubmit={handleBookingSubmit}
          className="booking-card glass-effect glass-effect--container relative overflow-visible p-4 sm:p-5 xl:p-6"
          noValidate
        >
          <div className="relative z-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex lg:min-w-0 lg:flex-1 lg:gap-0">
                <div className="booking-field">
                  <label htmlFor="event-type" className="booking-field-label">
                    Event Type
                  </label>
                  <CustomDropdown
                    value={booking.eventType}
                    onChange={(val) => updateBooking("eventType", val)}
                    options={EVENT_TYPES}
                  />
                </div>

                <div className="booking-field">
                  <label htmlFor="guests" className="booking-field-label">
                    Guest(s)
                  </label>
                  <CustomDropdown
                    value={booking.guests}
                    onChange={(val) => updateBooking("guests", val)}
                    options={GUEST_OPTIONS}
                  />
                </div>

                <div className="booking-field">
                  <label htmlFor="check-in" className="booking-field-label">
                    Check-In Date
                  </label>
                  <BookingDatePicker
                    id="check-in"
                    value={booking.checkIn}
                    onChange={(val) => updateBooking("checkIn", val)}
                  />
                </div>

                <div className="booking-field">
                  <label htmlFor="check-out" className="booking-field-label">
                    Check-Out Date
                  </label>
                  <BookingDatePicker
                    id="check-out"
                    value={booking.checkOut}
                    min={booking.checkIn || undefined}
                    align="end"
                    onChange={(val) => updateBooking("checkOut", val)}
                  />
                </div>
              </div>

              <div className="shrink-0 lg:self-center">
                <GoldButton type="submit" className="w-full lg:w-auto">
                  BOOK NOW
                </GoldButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
