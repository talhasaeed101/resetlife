"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { SITE } from "@/lib/site";
import { GoldButton } from "@/components/ui/GoldButton";
import {
  clearBookingPrefill,
  readBookingPrefill,
  BOOKING_PREFILL_EVENT,
} from "@/lib/scroll";
import {
  validateContactForm,
  type FieldErrors,
} from "@/lib/validation";

const formFields = [
  { id: "full-name", name: "fullName", label: "Full Name", type: "text" as const },
  { id: "email", name: "email", label: "Email Address", type: "email" as const },
  { id: "phone", name: "phone", label: "Phone Number", type: "tel" as const },
] as const;

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

type ContactFormProps = {
  variant: "mobile" | "desktop";
};

function ContactForm({ variant }: ContactFormProps) {
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

  const messageId =
    variant === "mobile" ? "message-mobile" : "message-desktop";

  return (
    <form
      className="flex flex-col gap-4 sm:gap-5"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={statusMessage ? `${formId}-status` : undefined}
    >
      {formFields.map((field) => {
        const inputId =
          variant === "mobile" ? field.id : `${field.id}-desktop`;

        return (
          <div key={field.id} className="flex flex-col gap-2">
            <label
              htmlFor={inputId}
              className="font-['Raleway'] text-[14px] font-medium text-white"
            >
              {field.label}
            </label>
            <input
              id={inputId}
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={(event) =>
                updateValue(field.name, event.target.value)
              }
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={
                errors[field.name] ? `${inputId}-error` : undefined
              }
              className="w-full rounded-[12px] border border-white/30 bg-transparent px-4 py-3 font-['Raleway'] text-[14px] text-white outline-none placeholder:text-[#8e8e8e]"
            />
            {errors[field.name] ? (
              <p
                id={`${inputId}-error`}
                className="font-['Raleway'] text-[12px] text-[#dfcba2]"
              >
                {errors[field.name]}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="flex flex-col gap-2">
        <label
          htmlFor={messageId}
          className="font-['Raleway'] text-[14px] font-medium text-white"
        >
          What&apos;s on your mind?
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          className="w-full resize-none rounded-[12px] border border-white/30 bg-transparent px-4 py-3 font-['Raleway'] text-[14px] text-white outline-none placeholder:text-[#8e8e8e]"
        />
        {errors.message ? (
          <p
            id={`${messageId}-error`}
            className="font-['Raleway'] text-[12px] text-[#dfcba2]"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      <GoldButton
        type="submit"
        className={`w-full ${variant === "mobile" ? "mt-1 sm:mt-2" : "mt-2"}`}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "SENDING..." : "SEND"}
      </GoldButton>

      {statusMessage ? (
        <p
          id={`${formId}-status`}
          role="status"
          className={`font-['Raleway'] text-[13px] leading-normal sm:text-[14px] ${
            status === "success" ? "text-white" : "text-[#dfcba2]"
          }`}
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#050b08]"
      style={{ position: "relative" }}
    >
      <div
        className="relative min-h-[640px] w-full sm:min-h-[700px] xl:h-[777px] xl:min-h-0"
        style={{ position: "relative", isolation: "isolate" }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={assets.cta.background}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-black/50" aria-hidden />

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-start justify-center gap-10 px-5 py-16 sm:gap-12 sm:px-8 md:px-10 lg:px-16 xl:hidden">
          <h2 className="max-w-[480px] font-['dtnightingale'] text-[32px] font-light leading-[1.15] text-white sm:text-[40px] md:text-[48px]">
            Need Help? We&apos;re Happy to Guide You!
          </h2>

          <div className="glass-surface w-full max-w-[520px] rounded-[20px] p-6 sm:rounded-[24px] sm:p-8">
            <ContactForm variant="mobile" />
          </div>
        </div>

        <div className="relative z-10 mx-auto hidden h-full w-[1280px] items-center justify-between px-20 xl:flex">
          <h2 className="max-w-[480px] font-['dtnightingale'] text-[56px] font-light leading-[1.1] text-white">
            Need Help? We&apos;re Happy to Guide You!
          </h2>

          <div className="glass-surface w-[520px] rounded-[24px] p-8">
            <ContactForm variant="desktop" />
          </div>
        </div>
      </div>
    </section>
  );
}
