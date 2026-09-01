import { assets } from "@/lib/assets";

export const VILLA_PRICE_LABEL = "Rs. 35,000 / Night";

export const VILLA_HERO_EYEBROW = "PREMIUM FARMHOUSE";

export const VILLA_HERO_TITLE = "Reset Life Farmhouse";

export const VILLA_EXPERIENCE_TITLE = "The Farmhouse Experience";

export const VILLA_EXPERIENCE_COPY = [
  "Reset Life Farmhouse is a peaceful escape designed to help you slow down, breathe deeply, and reconnect with what truly matters. Surrounded by nature and away from the noise of everyday life, it offers a refined setting for unhurried stays, intimate gatherings, and restful weekends.",
  "Every space has been thoughtfully composed for comfort and calm — from sunlit interiors and generous lounging areas to the private poolside atmosphere that defines the estate after dusk.",
  "Whether you are planning a short retreat or a longer stay, the farmhouse delivers a premium experience grounded in warmth, privacy, and understated luxury.",
] as const;

export const VILLA_AMENITIES = [
  { label: "4 Bedrooms", icon: "bed" },
  { label: "4 Bathrooms", icon: "bath" },
  { label: "Private Pool", icon: "pool" },
  { label: "High-Speed WiFi", icon: "wifi" },
  { label: "Fully Equipped Kitchen", icon: "kitchen" },
  { label: "Secure Parking", icon: "parking" },
] as const;

export const VILLA_GALLERY_IMAGES = [
  { src: assets.gallery.image1, alt: "Reset Life farmhouse pool at night" },
  { src: assets.gallery.image2, alt: "Farmhouse exterior and grounds" },
  { src: assets.gallery.image3, alt: "Farmhouse landscape detail" },
  { src: assets.gallery.image4, alt: "Farmhouse outdoor lounge area" },
  { src: assets.gallery.image5, alt: "Farmhouse architecture detail" },
] as const;

export const VILLA_RULES = [
  { label: "Check-in", value: "2:00 PM" },
  { label: "Check-out", value: "11:00 AM" },
  { label: "Maximum guests", value: "15 guests" },
  { label: "Smoking", value: "No smoking inside the villa" },
  { label: "Events", value: "Private gatherings by prior approval only" },
] as const;
