"use client";

import { useCallback, useEffect, useRef } from "react";

type AutoScrollOptions = {
  speed?: number;
  resumeDelay?: number;
};

export function useAutoScrollCarousel({
  speed = 0.6,
  resumeDelay = 2500,
}: AutoScrollOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  const pause = useCallback(() => {
    pausedRef.current = true;

    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, resumeDelay);
  }, [resumeDelay]);

  const resume = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    pausedRef.current = false;
  }, []);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const element = ref.current;

      if (element && !pausedRef.current) {
        const maxScroll = element.scrollWidth - element.clientWidth;

        if (maxScroll > 0) {
          element.scrollLeft += speed;

          if (element.scrollLeft >= maxScroll - 1) {
            element.scrollLeft = 0;
          }
        }
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);

      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, [speed]);

  const handlers = {
    onMouseEnter: pause,
    onMouseLeave: resume,
    onTouchStart: pause,
    onWheel: pause,
  };

  return { ref, handlers, pause, resume };
}
