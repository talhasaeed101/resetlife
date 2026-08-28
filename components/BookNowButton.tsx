"use client";

import { GoldButton } from "@/components/ui/GoldButton";
import { scrollToSection, storeBookingPrefill, dispatchBookingPrefill } from "@/lib/scroll";

type BookNowButtonProps = {
  eventType: string;
  className?: string;
};

export function BookNowButton({ eventType, className = "" }: BookNowButtonProps) {
  const handleClick = () => {
    storeBookingPrefill({
      eventType,
      message: `I would like to book ${eventType}.`,
    });
    scrollToSection("hero");
    dispatchBookingPrefill();
  };

  return (
    <GoldButton type="button" className={className} onClick={handleClick}>
      BOOK NOW
    </GoldButton>
  );
}
