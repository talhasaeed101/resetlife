"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { EVENT_TYPES, GUEST_OPTIONS } from "@/lib/site";
import { GoldButton } from "@/components/ui/GoldButton";
import { MobileMenu, SiteLogoLink } from "@/components/MobileMenu";
import { scrollToSection, storeBookingPrefill, readBookingPrefill, clearBookingPrefill, BOOKING_PREFILL_EVENT, dispatchBookingPrefill } from "@/lib/scroll";
import { validateBookingForm, type FieldErrors } from "@/lib/validation";

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

function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Choose",
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative z-[1] w-full" ref={containerRef}>
      <div
        className="booking-control-row cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`booking-control-input ${!value ? "is-placeholder" : ""} flex items-center min-h-[20px]`}>
          {value || placeholder}
        </div>
        <Image
          src={assets.hero.arrowDown}
          alt=""
          width={20}
          height={20}
          className={`booking-control-icon transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen ? (
        <div className="booking-dropdown" role="listbox">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="booking-dropdown-option"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(iso: string) {
  if (!iso) {
    return "";
  }
  const [year, month, day] = iso.split("-");
  return `${month}/${day}/${year}`;
}

function BookingDatePicker({
  id,
  value,
  min,
  align = "start",
  onChange,
}: {
  id: string;
  value: string;
  min?: string;
  align?: "start" | "end";
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    if (value) {
      const [year, month] = value.split("-").map(Number);
      return new Date(year, month - 1, 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysCount = new Date(year, month + 1, 0).getDate();
  const todayIso = toISODate(new Date());
  const monthLabel = visibleMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days = Array.from({ length: daysCount }, (_, index) => {
    const iso = toISODate(new Date(year, month, index + 1));
    return {
      day: index + 1,
      iso,
      disabled: Boolean(min && iso < min),
      selected: iso === value,
      today: iso === todayIso,
    };
  });

  return (
    <div className="relative z-[1] w-full" ref={containerRef}>
      <button
        type="button"
        id={id}
        className="booking-control-row w-full cursor-pointer border-0 bg-transparent p-0 text-left"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={`booking-control-input ${!value ? "is-placeholder" : ""} flex items-center min-h-[20px]`}>
          {value ? formatDisplayDate(value) : "mm/dd/yyyy"}
        </span>
        <Image
          src={assets.hero.calendar}
          alt=""
          width={20}
          height={20}
          className="booking-control-icon"
        />
      </button>

      {isOpen ? (
        <div
          className={`booking-calendar ${align === "end" ? "booking-calendar--end" : ""}`}
          role="dialog"
          aria-label="Choose date"
        >
          <div className="booking-calendar__header">
            <button
              type="button"
              className="booking-calendar__nav"
              aria-label="Previous month"
              onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
            >
              ‹
            </button>
            <p className="booking-calendar__month">{monthLabel}</p>
            <button
              type="button"
              className="booking-calendar__nav"
              aria-label="Next month"
              onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
            >
              ›
            </button>
          </div>
          <div className="booking-calendar__weekdays">
            {WEEKDAYS.map((weekday) => (
              <span key={weekday} className="booking-calendar__weekday">
                {weekday}
              </span>
            ))}
          </div>
          <div className="booking-calendar__grid">
            {Array.from({ length: firstWeekday }, (_, index) => (
              <span key={`empty-${index}`} className="booking-calendar__empty" />
            ))}
            {days.map((item) => (
              <button
                key={item.iso}
                type="button"
                disabled={item.disabled}
                className={`booking-calendar__day${item.selected ? " is-selected" : ""}${item.today ? " is-today" : ""}`}
                onClick={() => {
                  onChange(item.iso);
                  setIsOpen(false);
                }}
              >
                {item.day}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}


export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState<BookingState>(initialBookingState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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

      <div className="h-[76px] w-full shrink-0 xl:hidden" aria-hidden />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-6 self-center px-5 py-8 text-center sm:gap-8 sm:px-8 md:px-10 xl:w-[671px] xl:gap-11 xl:px-0 xl:py-10">
        <h1 className="font-['dtnightingale'] text-[36px] font-light leading-[1.05] tracking-[0.01em] text-white sm:text-[44px] md:text-[64px] lg:text-[72px] xl:text-[86px] xl:leading-[84px]">
          Escape to Nature.
          <br />
          Stay in Luxury.
        </h1>
        <p className="max-w-[540px] font-['Raleway'] text-[24px] font-medium leading-snug text-[#8e8e8e] sm:text-[18px] md:text-[20px] xl:max-w-none xl:text-[24px] xl:leading-none">
          Relax, reconnect, and create unforgettable moments surrounded by
          nature and tranquility.
        </p>
      </div>

      <div className="relative z-30 mx-auto w-full max-w-[1280px] shrink-0 px-5 pb-8 pt-2 sm:px-8 md:px-10 lg:px-16 xl:px-0 xl:pb-[63px]">
        <form
          onSubmit={handleBookingSubmit}
          className="booking-card relative overflow-visible rounded-[16px] p-4 sm:p-5 xl:p-6"
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
                  {errors.eventType ? (
                    <p className="booking-field-error">{errors.eventType}</p>
                  ) : null}
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
                  {errors.guests ? (
                    <p className="booking-field-error">{errors.guests}</p>
                  ) : null}
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
                  {errors.checkIn ? (
                    <p className="booking-field-error">{errors.checkIn}</p>
                  ) : null}
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
                  {errors.checkOut ? (
                    <p className="booking-field-error">{errors.checkOut}</p>
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
          </div>
        </form>
      </div>
    </section>
  );
}
