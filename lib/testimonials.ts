import { assets } from "@/lib/assets";

export type TestimonialItem = {
  id: string;
  name: string;
  quote: string;
  avatar: string;
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "jane-oliver",
    name: "Jane Oliver",
    quote:
      "It was a dream stay for us, the resort is such a beautiful place with the best services. The environment is so peaceful and luxury from the moment we arrived at this resort. Everything was just amazing & perfect.",
    avatar: assets.testimonial.avatar,
  },
];
