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
  className={`gold-button-luxury pointer pt-[17px] inline-flex h-[43px] max-w-[144px] items-center justify-center whitespace-nowrap rounded-[12px] px-6 py-4 text-center font-['BaskervvilleSC'] text-[16px] font-semibold leading-none text-[#050b08] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
  {...props}
>
  {children}
</button>
  );
}
