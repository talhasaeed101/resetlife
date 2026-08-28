"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { SITE } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const galleryImages = [
  assets.gallery.image1,
  assets.gallery.image2,
  assets.gallery.image3,
  assets.gallery.image4,
  assets.gallery.image5,
] as const;

const loopedImages = [...galleryImages, ...galleryImages];

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    let frame = 0;
    const tick = () => {
      track.scrollLeft += 0.5;
      const half = track.scrollWidth / 2;
      if (half > 0 && track.scrollLeft >= half) {
        track.scrollLeft -= half;
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-section__inner">
        <div className="gallery-section__header">
          <SectionHeading label="GALLERY" title="Find us on Instagram" />
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-instagram-cta"
            aria-label={`${SITE.instagramLabel} on Instagram`}
          >
            <span className="text-gradient-farm font-['BaskervvilleSC'] text-[16px] font-semibold sm:text-[18px]">
              {SITE.instagramHandle}
            </span>
          </a>
        </div>

        <div className="gallery-carousel-viewport">
          <div ref={trackRef} className="gallery-carousel-track overflow-x-auto">
            {loopedImages.map((image, index) => (
              <article
                key={`${image}-${index}`}
                data-gallery-card
                className="gallery-card"
                aria-hidden={index >= galleryImages.length}
              >
                <div className="gallery-card__media">
                  <Image
                    src={image}
                    alt={`Reset Life gallery image ${(index % galleryImages.length) + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 44vw, (max-width: 1280px) 30vw, 22vw"
                    draggable={false}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
