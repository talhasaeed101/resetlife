"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  isHomePage,
  readPendingSection,
  resolveSectionIdFromHash,
  scrollToSectionWhenReady,
} from "@/lib/scroll";
import type { SectionId } from "@/lib/site";

function getTargetSectionId(): SectionId | null {
  const hashSection = resolveSectionIdFromHash(window.location.hash);
  const pendingSection = readPendingSection();

  return hashSection ?? pendingSection;
}

export function SectionHashHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isHomePage(pathname)) {
      return;
    }

    const scrollToTarget = () => {
      const sectionId = getTargetSectionId();
      if (!sectionId) {
        return;
      }

      window.setTimeout(() => {
        scrollToSectionWhenReady(sectionId);
      }, 120);
    };

    scrollToTarget();
    window.addEventListener("hashchange", scrollToTarget);

    return () => {
      window.removeEventListener("hashchange", scrollToTarget);
    };
  }, [pathname]);

  return null;
}
