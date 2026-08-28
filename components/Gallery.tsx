"use client";

import { useCallback, useEffect, useRef } from "react";
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
const GALLERY_SCROLL_SPEED = 0.5;

function hasFinePointerHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchPausedRef = useRef(false);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = window.setTimeout(() => {
      if (!draggingRef.current) {
        pausedRef.current = false;
        touchPausedRef.current = false;
      }
    }, 2200);
  }, [clearResumeTimer]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    scheduleResume();
  }, [scheduleResume]);

  const resume = useCallback(() => {
    clearResumeTimer();
    if (!draggingRef.current) {
      pausedRef.current = false;
      touchPausedRef.current = false;
    }
  }, [clearResumeTimer]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    syncReducedMotion();
    mediaQuery.addEventListener("change", syncReducedMotion);

    let frame = 0;
    const tick = () => {
      if (!pausedRef.current && !draggingRef.current && !reducedMotionRef.current) {
        track.scrollLeft += GALLERY_SCROLL_SPEED;
        const half = track.scrollWidth / 2;

        if (half > 0 && track.scrollLeft >= half) {
          track.scrollLeft -= half;
        }
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", syncReducedMotion);
      clearResumeTimer();
    };
  }, [clearResumeTimer]);

  const onTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const onTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!touchStartRef.current) {
        return;
      }

      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

      if (deltaX > deltaY && deltaX > 10) {
        pausedRef.current = true;
        touchPausedRef.current = true;
        clearResumeTimer();
      }
    },
    [clearResumeTimer],
  );

  const onTouchEnd = useCallback(() => {
    touchStartRef.current = null;

    if (touchPausedRef.current) {
      scheduleResume();
    }
  }, [scheduleResume]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || event.button !== 0) {
        return;
      }

      const track = trackRef.current;
      if (!track) {
        return;
      }

      draggingRef.current = true;
      pausedRef.current = true;
      clearResumeTimer();
      dragPointerIdRef.current = event.pointerId;
      dragStartXRef.current = event.clientX;
      dragScrollLeftRef.current = track.scrollLeft;

      try {
        track.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture may fail on some browsers.
      }
    },
    [clearResumeTimer],
  );

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (
      !track ||
      !draggingRef.current ||
      dragPointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    track.scrollLeft =
      dragScrollLeftRef.current - (event.clientX - dragStartXRef.current);

    const half = track.scrollWidth / 2;
    if (half > 0 && track.scrollLeft >= half) {
      track.scrollLeft -= half;
    }
  }, []);

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (!track || dragPointerIdRef.current !== event.pointerId) {
        return;
      }

      draggingRef.current = false;
      dragPointerIdRef.current = null;

      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }

      scheduleResume();
    },
    [scheduleResume],
  );

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
          <div
            ref={trackRef}
            className="gallery-carousel-track overflow-x-auto"
            data-auto-scroll="gallery"
            onMouseEnter={() => {
              if (hasFinePointerHover()) {
                pause();
              }
            }}
            onMouseLeave={() => {
              if (hasFinePointerHover()) {
                resume();
              }
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            onWheel={() => {
              if (hasFinePointerHover()) {
                pause();
              }
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
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
