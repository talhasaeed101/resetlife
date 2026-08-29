export type FieldErrors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && PHONE_PATTERN.test(value.trim());
}

export function validateContactForm(values: {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us what is on your mind.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export function validateBookingForm(values: {
  eventType: string;
  guests: string;
  checkIn: string;
  checkOut: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.eventType) {
    errors.eventType = "Please choose an event type.";
  }

  if (!values.guests) {
    errors.guests = "Please choose the number of guests.";
  }

  if (!values.checkIn) {
    errors.checkIn = "Check-in date is required.";
  }

  if (!values.checkOut) {
    errors.checkOut = "Check-out date is required.";
  }

  if (values.checkIn && values.checkOut) {
    const checkInDate = new Date(values.checkIn);
    const checkOutDate = new Date(values.checkOut);

    if (checkOutDate <= checkInDate) {
      errors.checkOut = "Check-out must be after check-in.";
    }
  }

  return errors;
}

export function validateReservationForm(values: {
  fullName: string;
  phone: string;
  guests: string;
  checkIn: string;
  checkOut: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.guests) {
    errors.guests = "Please choose the number of guests.";
  }

  if (!values.checkIn) {
    errors.checkIn = "Check-in date is required.";
  }

  if (!values.checkOut) {
    errors.checkOut = "Check-out date is required.";
  }

  if (values.checkIn && values.checkOut) {
    const checkInDate = new Date(values.checkIn);
    const checkOutDate = new Date(values.checkOut);

    if (checkOutDate <= checkInDate) {
      errors.checkOut = "Check-out must be after check-in.";
    }
  }

  return errors;
}
