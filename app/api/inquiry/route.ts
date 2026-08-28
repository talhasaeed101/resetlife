import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import {
  isValidEmail,
  isValidPhone,
  validateBookingForm,
  validateContactForm,
} from "@/lib/validation";

type InquiryType = "contact" | "booking";

type InquiryPayload = {
  type: InquiryType;
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  eventType?: string;
  guests?: string;
  checkIn?: string;
  checkOut?: string;
};

async function sendWithResend(payload: {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false as const, reason: "SERVICE_NOT_CONFIGURED" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: [payload.to],
      subject: payload.subject,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
  });

  if (!response.ok) {
    return { ok: false as const, reason: "DELIVERY_FAILED" as const };
  }

  return { ok: true as const };
}

function buildEmailBody(data: InquiryPayload): string {
  if (data.type === "booking") {
    return [
      "New booking inquiry from Reset Life website",
      "",
      `Event Type: ${data.eventType ?? "Not provided"}`,
      `Guests: ${data.guests ?? "Not provided"}`,
      `Check-In: ${data.checkIn ?? "Not provided"}`,
      `Check-Out: ${data.checkOut ?? "Not provided"}`,
      "",
      data.message ? `Additional details:\n${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    "New contact form submission from Reset Life website",
    "",
    `Name: ${data.fullName ?? "Not provided"}`,
    `Email: ${data.email ?? "Not provided"}`,
    `Phone: ${data.phone ?? "Not provided"}`,
    "",
    "Message:",
    data.message ?? "",
  ].join("\n");
}

export async function POST(request: Request) {
  let body: InquiryPayload;

  try {
    body = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_REQUEST", message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (body.type === "booking") {
    const errors = validateBookingForm({
      eventType: body.eventType ?? "",
      guests: body.guests ?? "",
      checkIn: body.checkIn ?? "",
      checkOut: body.checkOut ?? "",
    });

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", errors },
        { status: 400 },
      );
    }
  } else if (body.type === "contact") {
    const errors = validateContactForm({
      fullName: body.fullName ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      message: body.message ?? "",
    });

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", errors },
        { status: 400 },
      );
    }

    if (!isValidEmail(body.email ?? "") || !isValidPhone(body.phone ?? "")) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", message: "Invalid form data." },
        { status: 400 },
      );
    }
  } else {
    return NextResponse.json(
      { ok: false, error: "INVALID_REQUEST", message: "Unknown inquiry type." },
      { status: 400 },
    );
  }

  const toEmail = process.env.CONTACT_FORM_TO_EMAIL?.trim() || SITE.email;
  const fromEmail =
    process.env.CONTACT_FORM_FROM_EMAIL?.trim() || "onboarding@resend.dev";

  const subject =
    body.type === "booking"
      ? `Reset Life Booking Inquiry — ${body.eventType}`
      : `Reset Life Contact — ${body.fullName}`;

  const delivery = await sendWithResend({
    to: toEmail,
    from: fromEmail,
    subject,
    text: buildEmailBody(body),
    replyTo: body.type === "contact" ? body.email : undefined,
  });

  if (!delivery.ok) {
    if (delivery.reason === "SERVICE_NOT_CONFIGURED") {
      return NextResponse.json(
        {
          ok: false,
          error: "SERVICE_NOT_CONFIGURED",
          message:
            "Email delivery is not configured yet. Please contact us directly.",
          fallbackEmail: SITE.email,
          fallbackPhone: SITE.phoneDisplay,
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: "DELIVERY_FAILED",
        message: "We could not send your message right now. Please try again.",
        fallbackEmail: SITE.email,
        fallbackPhone: SITE.phoneDisplay,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      body.type === "booking"
        ? "Your booking inquiry has been sent."
        : "Your message has been sent.",
  });
}
