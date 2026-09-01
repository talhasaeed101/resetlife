"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import {
  clearReservationPrefill,
  readReservationPrefill,
  submitVillaReservation,
  type VillaReservationDetails,
} from "@/lib/reservation";
import { EVENT_TYPES, GUEST_OPTIONS, PREFIX_OPTIONS } from "@/lib/site";
import { BookingDatePicker, CustomDropdown } from "@/components/booking/BookingFields";
import { GoldButton } from "@/components/ui/GoldButton";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { validateReservationForm, type FieldErrors } from "@/lib/validation";

type ReservationState = {
  eventType: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  prefix: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const initialState: ReservationState = {
  eventType: "",
  checkIn: "",
  checkOut: "",
  guests: "",
  prefix: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
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
      eventType: prefill.eventType ?? current.eventType,
      guests: prefill.guests ?? current.guests,
      checkIn: prefill.checkIn ?? current.checkIn,
      checkOut: prefill.checkOut ?? current.checkOut,
    }));
    clearReservationPrefill();
  }, []);

  const updateValue = (field: keyof ReservationState, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateReservationForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const details: VillaReservationDetails = values;
    submitVillaReservation(details);
  };

  return (
    <div className="min-h-screen bg-black">
      <section className="reservation-hero">
        <div className="reservation-hero__media" aria-hidden>
          <Image
            src={assets.hero.background}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="reservation-hero__overlay bg-[#00000099]" aria-hidden />

        <SiteHeader variant="overlay" />

        <div className="reservation-hero__spacer" aria-hidden />

        <div className="reservation-hero__content">
          <h1 className="reservation-hero__title">Book Your Stay.</h1>
          <p className="reservation-hero__subtitle">
            Book directly with us for the best available rate and enjoy a seamless stay.
            Every inquiry is reviewed with care for a personal Reset Life experience.
          </p>
        </div>
      </section>

      <div className="reservation-divider" aria-hidden />

      <main className="reservation-page">
        <div className="reservation-page__inner">
          <h2 className="reservation-page__heading">Reservation</h2>

          <form className="reservation-form" onSubmit={handleSubmit} noValidate>
            <div className="reservation-form__events">
              <div className="reservation-field">
                <div className="reservation-field__control reservation-field__control--booking">
                  <CustomDropdown
                    id="reservation-events"
                    value={values.eventType}
                    onChange={(value) => updateValue("eventType", value)}
                    options={EVENT_TYPES}
                    placeholder="Events"
                    popoverMode="anchored"
                  />
                </div>
                {errors.eventType ? (
                  <p className="reservation-field__error">{errors.eventType}</p>
                ) : null}
              </div>
            </div>

            <div className="reservation-form__row reservation-form__row--dates">
              <div className="reservation-field">
                <div className="reservation-field__control reservation-field__control--booking">
                  <BookingDatePicker
                    id="reservation-check-in"
                    value={values.checkIn}
                    placeholder="Check-in"
                    popoverMode="anchored"
                    onChange={(value) => updateValue("checkIn", value)}
                  />
                </div>
                {errors.checkIn ? (
                  <p className="reservation-field__error">{errors.checkIn}</p>
                ) : null}
              </div>

              <div className="reservation-field">
                <div className="reservation-field__control reservation-field__control--booking">
                  <BookingDatePicker
                    id="reservation-check-out"
                    value={values.checkOut}
                    min={values.checkIn || undefined}
                    align="end"
                    placeholder="Check-out"
                    popoverMode="anchored"
                    onChange={(value) => updateValue("checkOut", value)}
                  />
                </div>
                {errors.checkOut ? (
                  <p className="reservation-field__error">{errors.checkOut}</p>
                ) : null}
              </div>

              <div className="reservation-field">
                <div className="reservation-field__control reservation-field__control--booking">
                  <CustomDropdown
                    id="reservation-guests"
                    value={values.guests}
                    onChange={(value) => updateValue("guests", value)}
                    options={GUEST_OPTIONS}
                    placeholder="Guest(s)"
                    popoverMode="anchored"
                  />
                </div>
                {errors.guests ? (
                  <p className="reservation-field__error">{errors.guests}</p>
                ) : null}
              </div>
            </div>

            <div className="reservation-form__row reservation-form__row--name">
              <div className="reservation-field reservation-field--prefix">
                <div className="reservation-field__control reservation-field__control--booking">
                  <CustomDropdown
                    id="reservation-prefix"
                    value={values.prefix}
                    onChange={(value) => updateValue("prefix", value)}
                    options={PREFIX_OPTIONS}
                    placeholder="Prefix"
                    popoverMode="anchored"
                  />
                </div>
              </div>

              <div className="reservation-field">
                <input
                  id="reservation-first-name"
                  type="text"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={(event) => updateValue("firstName", event.target.value)}
                  aria-invalid={Boolean(errors.firstName)}
                />
                {errors.firstName ? (
                  <p className="reservation-field__error">{errors.firstName}</p>
                ) : null}
              </div>

              <div className="reservation-field">
                <input
                  id="reservation-last-name"
                  type="text"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={(event) => updateValue("lastName", event.target.value)}
                  aria-invalid={Boolean(errors.lastName)}
                />
                {errors.lastName ? (
                  <p className="reservation-field__error">{errors.lastName}</p>
                ) : null}
              </div>
            </div>

            <div className="reservation-form__row reservation-form__row--contact">
              <div className="reservation-field">
                <input
                  id="reservation-phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={values.phone}
                  onChange={(event) => updateValue("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone ? (
                  <p className="reservation-field__error">{errors.phone}</p>
                ) : null}
              </div>

              <div className="reservation-field">
                <input
                  id="reservation-email"
                  type="email"
                  placeholder="Email Address"
                  value={values.email}
                  onChange={(event) => updateValue("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                <p className="reservation-field__hint">
                  This is the email we will send your confirmation to.
                </p>
                {errors.email ? (
                  <p className="reservation-field__error">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <div className="reservation-form__submit">
              <GoldButton type="submit" className="reservation-form__book-btn">
                BOOK
              </GoldButton>
            </div>
          </form>
        </div>
      </main>

      <div className="reservation-divider" aria-hidden />

      <Footer />
    </div>
  );
}
