"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { assets } from "@/lib/assets";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const CALENDAR_WIDTH = 280;

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type PopoverPosition = {
  top: number;
  left: number;
  width: number;
};

function usePopoverPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
  align: "start" | "end" = "start",
) {
  const [position, setPosition] = useState<PopoverPosition>({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (!isOpen || !triggerRef.current) {
      return;
    }

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) {
        return;
      }

      const rect = trigger.getBoundingClientRect();
      const calendarLeft =
        align === "end"
          ? rect.right
          : rect.left;

      setPosition({
        top: rect.bottom + 10,
        left: calendarLeft,
        width: rect.width,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [align, isOpen, triggerRef]);

  return position;
}

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(iso: string) {
  if (!iso) {
    return "";
  }
  const [year, month, day] = iso.split("-");
  return `${month}/${day}/${year}`;
}

export function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Choose",
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  id?: string;
}) {
  const mounted = useIsClient();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const position = usePopoverPosition(triggerRef, isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`relative w-full ${isOpen ? "is-open" : ""}`}
      ref={containerRef}
    >
      <div
        id={id}
        ref={triggerRef}
        className="booking-control-row cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div
          className={`booking-control-input ${!value ? "is-placeholder" : ""} flex min-h-[20px] items-center`}
        >
          {value || placeholder}
        </div>
        <Image
          src={assets.hero.arrowDown}
          alt=""
          width={20}
          height={20}
          className={`booking-control-icon ${isOpen ? "is-open" : ""}`}
        />
      </div>

      {isOpen && mounted
        ? createPortal(
            <div
              ref={popoverRef}
              className="booking-dropdown glass-effect glass-effect--popover"
              role="listbox"
              style={{
                top: position.top,
                left: position.left,
                minWidth: Math.max(position.width, 192),
              }}
            >
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={value === option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="booking-dropdown-option"
                >
                  {option}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export function BookingDatePicker({
  id,
  value,
  min,
  align = "start",
  placeholder = "mm/dd/yyyy",
  onChange,
}: {
  id: string;
  value: string;
  min?: string;
  align?: "start" | "end";
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const mounted = useIsClient();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    if (value) {
      const [year, month] = value.split("-").map(Number);
      return new Date(year, month - 1, 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const position = usePopoverPosition(triggerRef, isOpen, align);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysCount = new Date(year, month + 1, 0).getDate();
  const todayIso = toISODate(new Date());
  const monthLabel = visibleMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days = Array.from({ length: daysCount }, (_, index) => {
    const iso = toISODate(new Date(year, month, index + 1));
    return {
      day: index + 1,
      iso,
      disabled: Boolean(min && iso < min),
      selected: iso === value,
      today: iso === todayIso,
    };
  });

  const calendarWidth =
    typeof window !== "undefined"
      ? Math.min(CALENDAR_WIDTH, window.innerWidth - 40)
      : CALENDAR_WIDTH;
  const calendarLeft =
    align === "end"
      ? position.left - calendarWidth
      : position.left;
  const calendarStyleLeft =
    typeof window !== "undefined"
      ? Math.max(12, Math.min(calendarLeft, window.innerWidth - calendarWidth - 12))
      : calendarLeft;

  return (
    <div
      className={`relative w-full ${isOpen ? "is-open" : ""}`}
      ref={containerRef}
    >
      <button
        type="button"
        id={id}
        ref={triggerRef}
        className="booking-control-row w-full cursor-pointer border-0 bg-transparent p-0 text-left"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span
          className={`booking-control-input ${!value ? "is-placeholder" : ""} flex min-h-[20px] items-center`}
        >
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <Image
          src={assets.hero.calendar}
          alt=""
          width={20}
          height={20}
          className="booking-control-icon"
        />
      </button>

      {isOpen && mounted
        ? createPortal(
            <div
              ref={popoverRef}
              className="booking-calendar glass-effect glass-effect--popover"
              role="dialog"
              aria-label="Choose date"
              style={{
                top: position.top,
                left: calendarStyleLeft,
                width: calendarWidth,
              }}
            >
              <div className="booking-calendar__header">
                <button
                  type="button"
                  className="booking-calendar__nav"
                  aria-label="Previous month"
                  onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
                >
                  ‹
                </button>
                <p className="booking-calendar__month">{monthLabel}</p>
                <button
                  type="button"
                  className="booking-calendar__nav"
                  aria-label="Next month"
                  onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
                >
                  ›
                </button>
              </div>
              <div className="booking-calendar__weekdays">
                {WEEKDAYS.map((weekday) => (
                  <span key={weekday} className="booking-calendar__weekday">
                    {weekday}
                  </span>
                ))}
              </div>
              <div className="booking-calendar__grid">
                {Array.from({ length: firstWeekday }, (_, index) => (
                  <span key={`empty-${index}`} className="booking-calendar__empty" />
                ))}
                {days.map((item) => (
                  <button
                    key={item.iso}
                    type="button"
                    disabled={item.disabled}
                    className={`booking-calendar__day${item.selected ? " is-selected" : ""}${item.today ? " is-today" : ""}`}
                    onClick={() => {
                      onChange(item.iso);
                      setIsOpen(false);
                    }}
                  >
                    {item.day}
                  </button>
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
