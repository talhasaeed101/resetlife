import type { ButtonHTMLAttributes, ReactNode } from "react";

type GoldButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function GoldButton({
  children,
  className = "",
  ...props
}: GoldButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-[12px] bg-gradient-to-r from-[#825e37] via-[#dfcba2] to-[#825e37] px-6 py-4 font-['BaskervvilleSC'] text-[16px] font-semibold leading-none text-[#050b08] transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
