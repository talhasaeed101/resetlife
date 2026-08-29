"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import {
  buildVillaWhatsAppUrl,
  clearReservationPrefill,
  readReservationPrefill,
  type VillaReservationDetails,
} from "@/lib/reservation";
import { GUEST_OPTIONS, ROUTES } from "@/lib/site";
import { VILLA_PRICE_LABEL as villaPrice } from "@/lib/villa";
import { GoldButton } from "@/components/ui/GoldButton";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { validateReservationForm, type FieldErrors } from "@/lib/validation";

type ReservationState = {
  fullName: string;
  phone: string;
  guests: string;
  checkIn: string;
  checkOut: string;
};

const initialState: ReservationState = {
  fullName: "",
  phone: "",
  guests: "",
  checkIn: "",
  checkOut: "",
};

export default function ReservationContent() {
  const [values, setValues] = useState<ReservationState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    const prefill = readReservationPrefill();
    if (!prefill) {
      return;
    }

    setValues((current) => ({
      ...current,
      guests: prefill.guests ?? current.guests,
      checkIn: prefill.checkIn ?? current.checkIn,
      checkOut: prefill.checkOut ?? current.checkOut,
    }));
    clearReservationPrefill();
  }, []);

  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const updateValue = (field: keyof ReservationState, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateReservationForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const details: VillaReservationDetails = values;
    const whatsappUrl = buildVillaWhatsAppUrl(details);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#050b08]">
      <SiteHeader />

      <main className="reservation-page">
        <div className="reservation-page__inner">
          <Link href={ROUTES.villa} className="reservation-page__back">
            Back to Villa Details
          </Link>

          <div className="reservation-page__header">
            <p className="reservation-page__eyebrow">VILLA RESERVATION</p>
            <h1 className="reservation-page__title">Book Your Stay</h1>
            <p className="reservation-page__subtitle">
              Complete your reservation details below. You will be redirected to WhatsApp
              to confirm availability with our team.
            </p>
          </div>

          <div className="reservation-page__layout">
            <form className="reservation-form" onSubmit={handleSubmit} noValidate>
              <div className="reservation-form__grid">
                <div className="reservation-field">
                  <label htmlFor="reservation-name">Full Name</label>
                  <input
                    id="reservation-name"
                    type="text"
                    value={values.fullName}
                    onChange={(event) => updateValue("fullName", event.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName ? (
                    <p className="reservation-field__error">{errors.fullName}</p>
                  ) : null}
                </div>

                <div className="reservation-field">
                  <label htmlFor="reservation-phone">Phone Number</label>
                  <input
                    id="reservation-phone"
                    type="tel"
                    value={values.phone}
                    onChange={(event) => updateValue("phone", event.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone ? (
                    <p className="reservation-field__error">{errors.phone}</p>
                  ) : null}
                </div>

                <div className="reservation-field">
                  <label htmlFor="reservation-guests">Guests</label>
                  <div className="reservation-field__control">
                    <select
                      id="reservation-guests"
                      value={values.guests}
                      onChange={(event) => updateValue("guests", event.target.value)}
                      className={!values.guests ? "is-placeholder" : ""}
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
                      className="reservation-field__icon"
                    />
                  </div>
                  {errors.guests ? (
                    <p className="reservation-field__error">{errors.guests}</p>
                  ) : null}
                </div>

                <div className="reservation-field">
                  <label htmlFor="reservation-check-in">Check-in</label>
                  <div className="reservation-field__control">
                    <input
                      id="reservation-check-in"
                      ref={checkInRef}
                      type="date"
                      value={values.checkIn}
                      onChange={(event) => updateValue("checkIn", event.target.value)}
                      onClick={() => openDatePicker(checkInRef.current)}
                      aria-invalid={Boolean(errors.checkIn)}
                    />
                    <button
                      type="button"
                      className="reservation-field__icon-btn"
                      aria-label="Open check-in calendar"
                      onClick={() => openDatePicker(checkInRef.current)}
                    >
                      <Image
                        src={assets.hero.calendar}
                        alt=""
                        width={20}
                        height={20}
                        className="reservation-field__icon"
                      />
                    </button>
                  </div>
                  {errors.checkIn ? (
                    <p className="reservation-field__error">{errors.checkIn}</p>
                  ) : null}
                </div>

                <div className="reservation-field">
                  <label htmlFor="reservation-check-out">Check-out</label>
                  <div className="reservation-field__control">
                    <input
                      id="reservation-check-out"
                      ref={checkOutRef}
                      type="date"
                      value={values.checkOut}
                      onChange={(event) => updateValue("checkOut", event.target.value)}
                      onClick={() => openDatePicker(checkOutRef.current)}
                      aria-invalid={Boolean(errors.checkOut)}
                    />
                    <button
                      type="button"
                      className="reservation-field__icon-btn"
                      aria-label="Open check-out calendar"
                      onClick={() => openDatePicker(checkOutRef.current)}
                    >
                      <Image
                        src={assets.hero.calendar}
                        alt=""
                        width={20}
                        height={20}
                        className="reservation-field__icon"
                      />
                    </button>
                  </div>
                  {errors.checkOut ? (
                    <p className="reservation-field__error">{errors.checkOut}</p>
                  ) : null}
                </div>
              </div>

              <GoldButton type="submit" className="w-full sm:w-auto">
                Continue on WhatsApp
              </GoldButton>
            </form>

            <aside className="reservation-summary">
              <p className="reservation-summary__label">Reset Life Farmhouse</p>
              <p className="reservation-summary__price">{villaPrice}</p>
              <p className="reservation-summary__copy">
                Villa reservations are confirmed directly with our team on WhatsApp after
                you submit your preferred dates and guest count.
              </p>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
