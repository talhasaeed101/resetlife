"use client";

import { useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import {
  submitCarReservation,
  type CarReservationDetails,
} from "@/lib/car-reservation";
import { CAR_OPTIONS, PERSON_OPTIONS, PREFIX_OPTIONS } from "@/lib/site";
import { BookingDatePicker, CustomDropdown } from "@/components/booking/BookingFields";
import { GoldButton } from "@/components/ui/GoldButton";
import { useToast } from "@/components/ui/Toast";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { formatValidationToast, validateCarReservationForm } from "@/lib/validation";

type CarReservationState = {
  carSelection: string;
  fromDate: string;
  toDate: string;
  persons: string;
  prefix: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const initialState: CarReservationState = {
  carSelection: "",
  fromDate: "",
  toDate: "",
  persons: "",
  prefix: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

export default function CarReservationContent() {
  const toast = useToast();
  const [values, setValues] = useState<CarReservationState>(initialState);

  const updateValue = (field: keyof CarReservationState, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateCarReservationForm(values);
    if (Object.keys(validationErrors).length > 0) {
      const { title, message } = formatValidationToast(validationErrors);
      toast.error(title, message);
      return;
    }

    const details: CarReservationDetails = values;
    toast.success(
      "Car reservation ready",
      "Opening WhatsApp with your reservation details.",
    );
    submitCarReservation(details);
  };

  return (
    <div className="min-h-screen bg-black">
      <section className="reservation-hero">
        <div className="reservation-hero__media" aria-hidden>
          <Image
            src={assets.villa.carReservationHero}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="reservation-hero__overlay" aria-hidden />

        <SiteHeader variant="overlay" />

        <div className="reservation-hero__spacer" aria-hidden />

        <div className="reservation-hero__content">
          <h1 className="reservation-hero__title">Luxury Beyond the Stay</h1>
          <p className="reservation-hero__subtitle">
            Make every moment memorable with a premium chauffeur-driven car reserved
            exclusively for your stay.
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
                    id="car-selection"
                    value={values.carSelection}
                    onChange={(value) => updateValue("carSelection", value)}
                    options={CAR_OPTIONS}
                    placeholder="Car Selection"
                    popoverMode="anchored"
                  />
                </div>
              </div>
            </div>

            <div className="reservation-form__row reservation-form__row--dates">
              <div className="reservation-field">
                <div className="reservation-field__control reservation-field__control--booking">
                  <BookingDatePicker
                    id="car-from-date"
                    value={values.fromDate}
                    placeholder="From"
                    popoverMode="anchored"
                    onChange={(value) => updateValue("fromDate", value)}
                  />
                </div>
              </div>

              <div className="reservation-field">
                <div className="reservation-field__control reservation-field__control--booking">
                  <BookingDatePicker
                    id="car-to-date"
                    value={values.toDate}
                    min={values.fromDate || undefined}
                    align="end"
                    placeholder="To"
                    popoverMode="anchored"
                    onChange={(value) => updateValue("toDate", value)}
                  />
                </div>
              </div>

              <div className="reservation-field">
                <div className="reservation-field__control reservation-field__control--booking">
                  <CustomDropdown
                    id="car-persons"
                    value={values.persons}
                    onChange={(value) => updateValue("persons", value)}
                    options={PERSON_OPTIONS}
                    placeholder="Persons"
                    popoverMode="anchored"
                  />
                </div>
              </div>
            </div>

            <div className="reservation-form__row reservation-form__row--name">
              <div className="reservation-field reservation-field--prefix">
                <div className="reservation-field__control reservation-field__control--booking">
                  <CustomDropdown
                    id="car-prefix"
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
                  id="car-first-name"
                  type="text"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={(event) => updateValue("firstName", event.target.value)}
                />
              </div>

              <div className="reservation-field">
                <input
                  id="car-last-name"
                  type="text"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={(event) => updateValue("lastName", event.target.value)}
                />
              </div>
            </div>

            <div className="reservation-form__row reservation-form__row--contact">
              <div className="reservation-field">
                <input
                  id="car-phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={values.phone}
                  onChange={(event) => updateValue("phone", event.target.value)}
                />
              </div>

              <div className="reservation-field">
                <input
                  id="car-email"
                  type="email"
                  placeholder="Email Address"
                  value={values.email}
                  onChange={(event) => updateValue("email", event.target.value)}
                />
                <p className="reservation-field__hint">
                  This is the email we will send your confirmation to.
                </p>
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
