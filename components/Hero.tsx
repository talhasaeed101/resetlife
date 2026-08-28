"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { EVENT_TYPES, GUEST_OPTIONS } from "@/lib/site";
import { GoldButton } from "@/components/ui/GoldButton";
import { MobileMenu, SiteLogoLink } from "@/components/MobileMenu";
import { scrollToSection, storeBookingPrefill, readBookingPrefill, clearBookingPrefill, BOOKING_PREFILL_EVENT, dispatchBookingPrefill } from "@/lib/scroll";
import { validateBookingForm, type FieldErrors } from "@/lib/validation";

const fieldClassName =
  "w-full bg-transparent font-['Raleway'] text-[14px] font-medium text-white outline-none sm:text-[16px]";

const selectClassName = `${fieldClassName} appearance-none cursor-pointer`;

const dateClassName = `${fieldClassName} [color-scheme:dark]`;

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState<BookingState>(initialBookingState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleBookingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const validationErrors = validateBookingForm(booking);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          ...booking,
          message: `Booking request for ${booking.eventType} (${booking.guests}).`,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        fallbackEmail?: string;
      };

      if (response.ok && result.ok) {
        setBooking(initialBookingState);
        setStatusMessage(result.message ?? "Your booking inquiry has been sent.");
        return;
      }

      if (result.error === "SERVICE_NOT_CONFIGURED") {
        storeBookingPrefill({
          ...booking,
          message: `I would like to book ${booking.eventType} for ${booking.guests}. Check-in: ${booking.checkIn}. Check-out: ${booking.checkOut}.`,
        });
        scrollToSection("contact");
        dispatchBookingPrefill();
        setStatusMessage(
          "Online booking delivery is not configured yet. We opened the contact form with your booking details.",
        );
        return;
      }

      setStatus("error");
      setStatusMessage(
        result.message ??
          "We could not send your booking inquiry. Please use the contact form below.",
      );
    } catch {
      setStatus("error");
      setStatusMessage(
        "We could not send your booking inquiry. Please use the contact form below.",
      );
    } finally {
      setStatus((current) => (current === "submitting" ? "idle" : current));
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden xl:block xl:h-[1024px] xl:min-h-0"
      style={{ position: "relative", isolation: "isolate" }}
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

      <header
        className={`site-header-layer flex w-full max-w-[1440px] items-start justify-between self-center px-5 py-6 sm:px-8 md:px-10 lg:px-16 xl:absolute xl:left-0 xl:right-0 xl:top-10 xl:mx-auto xl:px-20 xl:py-0 ${
          menuOpen ? "site-header-layer--menu-open" : ""
        }`}
      >
        <SiteLogoLink />

        <button
          type="button"
          className="glass-surface pointer-events-auto flex items-center gap-[6px] rounded-[12px] px-3 py-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
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
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 self-center px-5 py-8 text-center sm:gap-8 sm:px-8 md:px-10 xl:absolute xl:left-1/2 xl:top-[293px] xl:w-[671px] xl:-translate-x-1/2 xl:gap-11 xl:px-0 xl:py-0">
        <h1 className="font-['dtnightingale'] text-[36px] font-light leading-[1.05] text-white sm:text-[44px] md:text-[64px] lg:text-[72px] xl:text-[86px] xl:leading-[84px]">
          Escape to Nature.
          <br />
          Stay in Luxury.
        </h1>
        <p className="max-w-[540px] font-['Raleway'] text-[16px] font-medium leading-snug text-[#8e8e8e] sm:text-[18px] md:text-[20px] xl:max-w-none xl:text-[24px] xl:leading-none">
          Relax, reconnect, and create unforgettable moments surrounded by
          nature and tranquility.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] self-center px-5 pb-8 sm:px-8 md:px-10 lg:px-16 xl:absolute xl:bottom-[63px] xl:left-1/2 xl:-translate-x-1/2 xl:px-0 xl:pb-0">
        <form
          onSubmit={handleBookingSubmit}
          className="glass-surface overflow-hidden rounded-[16px] p-4 sm:p-5 xl:p-6"
          noValidate
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex lg:min-w-0 lg:flex-1 lg:gap-6">
              <div className="flex min-w-0 flex-col gap-3 px-0 sm:gap-4 lg:flex-1 lg:px-4">
                <label
                  htmlFor="event-type"
                  className="font-['BaskervvilleSC'] text-[16px] font-semibold text-white sm:text-[18px]"
                >
                  Event Type
                </label>
                <div className="flex items-center justify-between gap-3">
                  <select
                    id="event-type"
                    value={booking.eventType}
                    onChange={(event) =>
                      updateBooking("eventType", event.target.value)
                    }
                    className={`${selectClassName} min-w-0 flex-1 ${!booking.eventType ? "text-[#8e8e8e]" : ""}`}
                  >
                    <option value="">Choose</option>
                    {EVENT_TYPES.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                  <Image
                    src={assets.hero.arrowDown}
                    alt=""
                    width={20}
                    height={20}
                    className="pointer-events-none h-5 w-5 shrink-0"
                  />
                </div>
                {errors.eventType ? (
                  <p className="font-['Raleway'] text-[12px] text-[#dfcba2]">
                    {errors.eventType}
                  </p>
                ) : null}
              </div>

              <div className="flex min-w-0 flex-col gap-3 px-0 sm:gap-4 lg:flex-1 lg:px-4">
                <label
                  htmlFor="guests"
                  className="font-['BaskervvilleSC'] text-[16px] font-semibold text-white sm:text-[18px]"
                >
                  Guest(s)
                </label>
                <div className="flex items-center justify-between gap-3">
                  <select
                    id="guests"
                    value={booking.guests}
                    onChange={(event) =>
                      updateBooking("guests", event.target.value)
                    }
                    className={`${selectClassName} min-w-0 flex-1 ${!booking.guests ? "text-[#8e8e8e]" : ""}`}
                  >
                    <option value="">Choose</option>
                    {GUEST_OPTIONS.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                  <Image
                    src={assets.hero.arrowDown}
                    alt=""
                    width={20}
                    height={20}
                    className="pointer-events-none h-5 w-5 shrink-0"
                  />
                </div>
                {errors.guests ? (
                  <p className="font-['Raleway'] text-[12px] text-[#dfcba2]">
                    {errors.guests}
                  </p>
                ) : null}
              </div>

              <div className="flex min-w-0 flex-col gap-3 px-0 sm:gap-4 lg:flex-1 lg:px-4">
                <label
                  htmlFor="check-in"
                  className="font-['BaskervvilleSC'] text-[16px] font-semibold text-white sm:text-[18px]"
                >
                  Check-In Date
                </label>
                <div className="flex items-center justify-between gap-3">
                  <input
                    id="check-in"
                    type="date"
                    value={booking.checkIn}
                    onChange={(event) =>
                      updateBooking("checkIn", event.target.value)
                    }
                    className={`${dateClassName} min-w-0 flex-1 ${!booking.checkIn ? "text-[#8e8e8e]" : ""}`}
                  />
                  <Image
                    src={assets.hero.calendar}
                    alt=""
                    width={20}
                    height={20}
                    className="pointer-events-none h-5 w-5 shrink-0"
                  />
                </div>
                {errors.checkIn ? (
                  <p className="font-['Raleway'] text-[12px] text-[#dfcba2]">
                    {errors.checkIn}
                  </p>
                ) : null}
              </div>

              <div className="flex min-w-0 flex-col gap-3 px-0 sm:gap-4 lg:flex-1 lg:px-4">
                <label
                  htmlFor="check-out"
                  className="font-['BaskervvilleSC'] text-[16px] font-semibold text-white sm:text-[18px]"
                >
                  Check-Out Date
                </label>
                <div className="flex items-center justify-between gap-3">
                  <input
                    id="check-out"
                    type="date"
                    value={booking.checkOut}
                    min={booking.checkIn || undefined}
                    onChange={(event) =>
                      updateBooking("checkOut", event.target.value)
                    }
                    className={`${dateClassName} min-w-0 flex-1 ${!booking.checkOut ? "text-[#8e8e8e]" : ""}`}
                  />
                  <Image
                    src={assets.hero.calendar}
                    alt=""
                    width={20}
                    height={20}
                    className="pointer-events-none h-5 w-5 shrink-0"
                  />
                </div>
                {errors.checkOut ? (
                  <p className="font-['Raleway'] text-[12px] text-[#dfcba2]">
                    {errors.checkOut}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="shrink-0 lg:self-center">
              <GoldButton
                type="submit"
                className="w-full lg:w-auto"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "SENDING..." : "BOOK NOW"}
              </GoldButton>
            </div>
          </div>

          {statusMessage ? (
            <p
              className={`mt-4 font-['Raleway'] text-[13px] leading-normal sm:text-[14px] ${
                status === "error" ? "text-[#dfcba2]" : "text-white"
              }`}
              role="status"
            >
              {statusMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
