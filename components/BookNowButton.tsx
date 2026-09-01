"use client";

import { useRouter } from "next/navigation";
import { GoldButton } from "@/components/ui/GoldButton";
import { storeReservationPrefill } from "@/lib/reservation";
import { ROUTES } from "@/lib/site";

type BookNowButtonProps = {
  eventType: string;
  className?: string;
};

export function BookNowButton({ eventType, className = "" }: BookNowButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    storeReservationPrefill({ eventType });
    router.push(ROUTES.reservation);
  };

  return (
    <GoldButton type="button" className={className} onClick={handleClick}>
      BOOK NOW
    </GoldButton>
  );
}
