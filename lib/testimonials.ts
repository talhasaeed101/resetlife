import { assets } from "@/lib/assets";

export type TestimonialItem = {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatar: string;
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "ahmed-r",
    name: "Ahmed R.",
    location: "Islamabad",
    quote:
      "The perfect place for a peaceful family gathering. The farmhouse was beautiful, private, and the overall experience was excellent.",
    avatar: assets.gallery.image1,
  },
  {
    id: "hamza-k",
    name: "Hamza K.",
    location: "Rawalpindi",
    quote:
      "We hosted a small celebration here and loved the atmosphere. The property is spacious, peaceful, and beautifully maintained.",
    avatar: assets.gallery.image2,
  },
  {
    id: "ayesha-m",
    name: "Ayesha M.",
    location: "Islamabad",
    quote:
      "Absolutely loved the environment at Reset Life Farmhouse. It felt peaceful, private, and perfect for spending quality time with family.",
    avatar: assets.gallery.image3,
  },
  {
    id: "sara-a",
    name: "Sara A.",
    location: "Islamabad",
    quote:
      "The villa and outdoor space were beautiful. Everything had such a calm and elegant feel, making our gathering really special.",
    avatar: assets.gallery.image4,
  },
];
