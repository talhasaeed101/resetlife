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
      className={`gold-button-luxury inline-flex items-center justify-center rounded-[12px] px-6 py-4 font-['BaskervvilleSC'] text-[16px] max-w-[144px] whitespace-nowrap font-semibold leading-none text-[#050b08] h-[43px] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
