"use client";

import { useCallback, useEffect, useRef } from "react";

type AutoScrollOptions = {
  speed?: number;
  resumeDelay?: number;
  loopAtHalf?: boolean;
};

function hasFinePointerHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function useAutoScrollCarousel({
  speed = 0.6,
  resumeDelay = 2200,
  loopAtHalf = false,
}: AutoScrollOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);
  const loopWidthRef = useRef(0);

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
      }
    }, resumeDelay);
  }, [clearResumeTimer, resumeDelay]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    scheduleResume();
  }, [scheduleResume]);

  const resume = useCallback(() => {
    clearResumeTimer();
    if (!draggingRef.current) {
      pausedRef.current = false;
    }
  }, [clearResumeTimer]);

  const normalizeScroll = useCallback(
    (element: HTMLDivElement) => {
      if (loopAtHalf) {
        const halfWidth = loopWidthRef.current || element.scrollWidth / 2;
        if (halfWidth > 0 && element.scrollLeft >= halfWidth) {
          element.scrollLeft -= halfWidth;
        }
        return;
      }

      const maxScroll = element.scrollWidth - element.clientWidth;
      if (maxScroll > 0 && element.scrollLeft >= maxScroll - 1) {
        element.scrollLeft = 0;
      }
    },
    [loopAtHalf],
  );

  const measureLoop = useCallback(
    (element: HTMLDivElement, resetPosition: boolean) => {
      if (!loopAtHalf) {
        return;
      }

      const halfWidth = element.scrollWidth / 2;
      const widthChanged = halfWidth > 0 && halfWidth !== loopWidthRef.current;
      loopWidthRef.current = halfWidth;

      if (halfWidth > 0 && (resetPosition || widthChanged)) {
        element.scrollLeft = halfWidth;
      }
    },
    [loopAtHalf],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    syncReducedMotion();
    mediaQuery.addEventListener("change", syncReducedMotion);

    return () => mediaQuery.removeEventListener("change", syncReducedMotion);
  }, []);

  useEffect(() => {
    const track = ref.current;
    if (!track) {
      return;
    }

    measureLoop(track, track.scrollLeft < 2);

    const resizeObserver = new ResizeObserver(() => {
      measureLoop(track, false);
    });
    resizeObserver.observe(track);

    track.querySelectorAll("img").forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", () => measureLoop(track, true), { once: true });
      }
    });

    let frame = 0;
    const tick = () => {
      if (!pausedRef.current && !draggingRef.current && !reducedMotionRef.current) {
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (maxScroll > 0) {
          track.scrollLeft += Math.max(speed, 0.5);
          normalizeScroll(track);
        }
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      clearResumeTimer();
    };
  }, [clearResumeTimer, measureLoop, normalizeScroll, speed]);

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
        clearResumeTimer();
      }
    },
    [clearResumeTimer],
  );

  const onTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    scheduleResume();
  }, [scheduleResume]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || event.button !== 0) {
        return;
      }

      const track = ref.current;
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

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const track = ref.current;
      if (
        !track ||
        !draggingRef.current ||
        dragPointerIdRef.current !== event.pointerId
      ) {
        return;
      }

      track.scrollLeft =
        dragScrollLeftRef.current - (event.clientX - dragStartXRef.current);
      normalizeScroll(track);
    },
    [normalizeScroll],
  );

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const track = ref.current;
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

  const handlers = {
    onMouseEnter: () => {
      if (hasFinePointerHover()) {
        pause();
      }
    },
    onMouseLeave: () => {
      if (hasFinePointerHover()) {
        resume();
      }
    },
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel: onTouchEnd,
    onWheel: () => {
      if (hasFinePointerHover()) {
        pause();
      }
    },
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  };

  return { ref, handlers, pause, resume };
}
