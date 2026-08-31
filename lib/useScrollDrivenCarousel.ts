"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  sensitivity?: number;
  friction?: number;
};

export function useScrollDrivenCarousel({
  sensitivity = 1.4,
  friction = 0.88,
}: Options = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);

  /**
   * THREE-STATE animation flag:
   *  "hidden"   → initial / reset state   (opacity-0, translate-x-20)
   *  "primed"   → painted hidden, waiting one rAF before flipping visible
   *  "visible"  → animate to final state  (opacity-100, translate-x-0)
   *
   * Using a string enum instead of boolean makes the double-rAF trick type-safe.
   */
  const [animState, setAnimState] = useState<"hidden" | "primed" | "visible">(
    "hidden",
  );

  // Momentum refs
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // ── Momentum loop ──────────────────────────────────────────────────
  const stopMomentum = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    velocityRef.current = 0;
  }, []);

  const startMomentum = useCallback(() => {
    if (rafRef.current !== null) return;
    const step = () => {
      const track = trackRef.current;
      if (!track) { rafRef.current = null; return; }
      velocityRef.current *= friction;
      if (Math.abs(velocityRef.current) < 0.3) {
        velocityRef.current = 0;
        rafRef.current = null;
        return;
      }
      track.scrollLeft += velocityRef.current;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [friction]);

  // ── IntersectionObserver ───────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let enterRaf1: number;
    let enterRaf2: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          /**
           * ENTER path
           * Step 1: set "hidden" so the browser paints the off-screen state.
           * Step 2: after two rAF ticks (guarantees at least one paint),
           *         flip to "visible" so the CSS transition has a real "from".
           */
          setAnimState("hidden");
          enterRaf1 = requestAnimationFrame(() => {
            enterRaf2 = requestAnimationFrame(() => {
              setAnimState("visible");
            });
          });
        } else {
          // LEAVE path – cancel any pending enter, reset state for next entry
          cancelAnimationFrame(enterRaf1);
          cancelAnimationFrame(enterRaf2);
          setAnimState("hidden");
          stopMomentum();
        }
      },
      // Low threshold so it fires reliably on all screen sizes / orientations
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(enterRaf1);
      cancelAnimationFrame(enterRaf2);
    };
  }, [stopMomentum]);

  // ── Wheel hijack ───────────────────────────────────────────────────
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const track = trackRef.current;
      if (!track || !isInViewRef.current) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      const atStart = track.scrollLeft <= 0;
      const atEnd = track.scrollLeft >= maxScroll - 1;

      if (e.deltaY > 0 && atEnd) { stopMomentum(); return; }
      if (e.deltaY < 0 && atStart) { stopMomentum(); return; }

      e.preventDefault();
      e.stopPropagation();

      velocityRef.current += e.deltaY * sensitivity * 0.06;
      velocityRef.current = Math.max(-40, Math.min(40, velocityRef.current));
      startMomentum();
    },
    [sensitivity, startMomentum, stopMomentum],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // ── Touch hijack ───────────────────────────────────────────────────
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastTouchXRef = useRef(0);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      touchStartRef.current = { x: t.clientX, y: t.clientY };
      lastTouchXRef.current = t.clientX;
      stopMomentum();
    },
    [stopMomentum],
  );

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const track = trackRef.current;
    if (!track || !isInViewRef.current || !touchStartRef.current) return;
    const t = e.touches[0];
    if (!t) return;

    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    if (Math.abs(dx) < Math.abs(dy)) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;
    if ((dx > 0 && track.scrollLeft <= 0) || (dx < 0 && track.scrollLeft >= maxScroll - 1)) return;

    e.preventDefault();
    const delta = lastTouchXRef.current - t.clientX;
    velocityRef.current = delta * 0.6;
    track.scrollLeft += delta;
    lastTouchXRef.current = t.clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    startMomentum();
  }, [startMomentum]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchmove", handleTouchMove, { passive: false });
    section.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  useEffect(() => () => stopMomentum(), [stopMomentum]);

  return { sectionRef, trackRef, animState };
}
