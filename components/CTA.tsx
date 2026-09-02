"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { SITE } from "@/lib/site";
import {
  clearBookingPrefill,
  readBookingPrefill,
  BOOKING_PREFILL_EVENT,
} from "@/lib/scroll";
import {
  validateContactForm,
  type FieldErrors,
} from "@/lib/validation";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const applyContactPrefill = () => {
      const prefill = readBookingPrefill();
      if (!prefill?.message) {
        return;
      }

      setValues((current) => ({
        ...current,
        message: prefill.message ?? current.message,
      }));
      clearBookingPrefill();
    };

    applyContactPrefill();
    window.addEventListener(BOOKING_PREFILL_EVENT, applyContactPrefill);
    return () =>
      window.removeEventListener(BOOKING_PREFILL_EVENT, applyContactPrefill);
  }, []);

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status === "success") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const validationErrors = validateContactForm(values);
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
          type: "contact",
          ...values,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        fallbackEmail?: string;
        fallbackPhone?: string;
      };

      if (response.ok && result.ok) {
        setValues(initialValues);
        setStatus("success");
        setStatusMessage(result.message ?? "Your message has been sent.");
        return;
      }

      setStatus("error");

      if (result.error === "SERVICE_NOT_CONFIGURED") {
        setStatusMessage(
          `Online delivery is not configured yet. Please email ${result.fallbackEmail ?? SITE.email} or call ${result.fallbackPhone ?? SITE.phoneDisplay}.`,
        );
        return;
      }

      setStatusMessage(
        result.message ??
          "We could not send your message right now. Please try again or contact us directly.",
      );
    } catch {
      setStatus("error");
      setStatusMessage(
        "We could not send your message right now. Please try again or contact us directly.",
      );
    }
  };

  return (
    <div className="cta-form-card">
      <form
        className="cta-form"
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={statusMessage ? `${formId}-status` : undefined}
      >
        <div className="cta-form__field">
          <input
            id={`${formId}-full-name`}
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={(event) => updateValue("fullName", event.target.value)}
            placeholder="Your name*"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={
              errors.fullName ? `${formId}-full-name-error` : undefined
            }
            className="cta-form__input"
          />
          {errors.fullName ? (
            <p
              id={`${formId}-full-name-error`}
              className="cta-form__error"
            >
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="cta-form__field">
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            placeholder="Your e-mail*"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? `${formId}-email-error` : undefined
            }
            className="cta-form__input"
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="cta-form__error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="cta-form__field">
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            placeholder="Your phone*"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone ? `${formId}-phone-error` : undefined
            }
            className="cta-form__input"
          />
          {errors.phone ? (
            <p id={`${formId}-phone-error`} className="cta-form__error">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="cta-form__field cta-form__field--message">
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={3}
            value={values.message}
            onChange={(event) => updateValue("message", event.target.value)}
            placeholder="Type your message here..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? `${formId}-message-error` : undefined
            }
            className="cta-form__input cta-form__textarea"
          />
          {errors.message ? (
            <p id={`${formId}-message-error`} className="cta-form__error">
              {errors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="cta-form__submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "SENDING..." : "SEND"}
        </button>

        {statusMessage ? (
          <p
            id={`${formId}-status`}
            role="status"
            className={`cta-form__status ${
              status === "success" ? "cta-form__status--success" : ""
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default function CTA() {
  return (
    <section id="contact" className="cta-section">
      <div className="cta-section__media">
        <Image
          src= "/Images/contact/ctabg.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="cta-section__overlay" aria-hidden />
      </div>

      <div className="cta-section__content">
        <div className="cta-section__copy">
          <p className="cta-section__label">CONTACT US</p>
          <h2 className="cta-section__heading">
            Need Help?
            <br />
            We&apos;re Happy to
            <br />
            Guide You.
          </h2>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
