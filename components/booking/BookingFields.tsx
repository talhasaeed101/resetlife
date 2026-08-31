"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
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
    <div className="relative z-[1] w-full" ref={containerRef}>
      <div
        id={id}
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
          className={`booking-control-icon transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen ? (
        <div className="booking-dropdown" role="listbox">
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
        </div>
      ) : null}
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
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    if (value) {
      const [year, month] = value.split("-").map(Number);
      return new Date(year, month - 1, 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
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

  return (
    <div className="relative z-[1] w-full" ref={containerRef}>
      <button
        type="button"
        id={id}
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

      {isOpen ? (
        <div
          className={`booking-calendar ${align === "end" ? "booking-calendar--end" : ""}`}
          role="dialog"
          aria-label="Choose date"
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
        </div>
      ) : null}
    </div>
  );
}
