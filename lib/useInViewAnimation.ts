"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewAnimationOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useInViewAnimation({
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
}: UseInViewAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
