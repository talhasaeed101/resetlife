import type { Metadata } from "next";
import { getSiteUrl, SITE } from "@/lib/site";

export const DEFAULT_OG_IMAGE = "/Images/homePage/heroBg1.png";

type CreateMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  const siteUrl = getSiteUrl();
  if (path === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(ogImage);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE.name} in Gulberg Greens, Islamabad`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const homeMetadata = createMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export const villaMetadata = createMetadata({
  title: "Reset Life Farmhouse Stay | Villa & Farmhouse Booking in Islamabad",
  description:
    "Explore the Reset Life Farmhouse villa in Gulberg Greens, Islamabad. Private pool, refined interiors, and peaceful surroundings for overnight stays and weekend retreats.",
  path: "/villa",
  ogImage: "/Images/villa/villaBg.png",
});

export const reservationMetadata = createMetadata({
  title: "Book Reset Life Farmhouse | Villa Stay & Event Reservation",
  description:
    "Submit your stay or event inquiry at Reset Life Farmhouse in Islamabad. Share your dates, guest count, and event details to check availability.",
  path: "/reservation",
});

export const carReservationMetadata = createMetadata({
  title: "Luxury Car Reservation | Reset Life Farmhouse Islamabad",
  description:
    "Reserve a premium chauffeur-driven luxury car for your stay or event at Reset Life Farmhouse in Gulberg Greens, Islamabad.",
  path: "/car-reservation",
  ogImage: "/Images/villadetail/Hero Section.png",
});

export const privacyMetadata = createMetadata({
  title: "Privacy Policy | Reset Life Farmhouse",
  description:
    "Read how Reset Life Farmhouse handles personal information submitted through website contact and booking forms.",
  path: "/privacy",
  noIndex: true,
});

export const termsMetadata = createMetadata({
  title: "Terms of Service | Reset Life Farmhouse",
  description:
    "Terms of Service for using the Reset Life Farmhouse website and submitting booking or contact requests.",
  path: "/terms",
  noIndex: true,
});
