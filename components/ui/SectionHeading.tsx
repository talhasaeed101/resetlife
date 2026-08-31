type SectionHeadingProps = {
  label: string;
  title: string;
  labelClassName?: string;
  titleClassName?: string;
  align?: "left" | "right";
};

export function SectionHeading({
  label,
  title,
  labelClassName = "text-[16px]",
  titleClassName = "text-[32px] sm:text-[40px] xl:text-[50px]",
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-5 ${alignClass}`}>
      <p
        className={`text-gradient-farm font-['BaskervvilleSC'] font-semibold leading-none tracking-[0.08em] ${labelClassName}`}
      >
        {label}
      </p>
      <h2
        className={`font-['dtnightingale'] font-light leading-none tracking-[0.01em] text-white ${titleClassName}`}
      >
        {title}
      </h2>
    </div>
  );
}
