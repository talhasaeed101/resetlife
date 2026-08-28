"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { GoldButton } from "@/components/ui/GoldButton";

const formFields = [
  { id: "full-name", label: "Full Name", type: "text" as const },
  { id: "email", label: "Email Address", type: "email" as const },
  { id: "phone", label: "Phone Number", type: "tel" as const },
] as const;

export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050b08]">
      <div className="relative min-h-[640px] w-full sm:min-h-[700px] xl:h-[777px] xl:min-h-0">
        <Image
          src={assets.cta.background}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />

        {/* Mobile / tablet — stacked */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-start justify-center gap-10 px-5 py-16 sm:gap-12 sm:px-8 md:px-10 lg:px-16 xl:hidden">
          <h2 className="max-w-[480px] font-['dtnightingale'] text-[32px] font-light leading-[1.15] text-white sm:text-[40px] md:text-[48px]">
            Need Help? We&apos;re Happy to Guide You!
          </h2>

          <div className="glass-surface w-full max-w-[520px] rounded-[20px] p-6 sm:rounded-[24px] sm:p-8">
            <form
              className="flex flex-col gap-4 sm:gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              {formFields.map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label
                    htmlFor={field.id}
                    className="font-['Raleway'] text-[14px] font-medium text-white"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    className="w-full rounded-[12px] border border-white/30 bg-transparent px-4 py-3 font-['Raleway'] text-[14px] text-white outline-none placeholder:text-[#8e8e8e]"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message-mobile"
                  className="font-['Raleway'] text-[14px] font-medium text-white"
                >
                  What&apos;s on your mind?
                </label>
                <textarea
                  id="message-mobile"
                  rows={4}
                  className="w-full resize-none rounded-[12px] border border-white/30 bg-transparent px-4 py-3 font-['Raleway'] text-[14px] text-white outline-none placeholder:text-[#8e8e8e]"
                />
              </div>

              <GoldButton type="submit" className="mt-1 w-full sm:mt-2">
                SEND
              </GoldButton>
            </form>
          </div>
        </div>

        {/* Desktop — unchanged split layout */}
        <div className="relative z-10 mx-auto hidden h-full w-[1280px] items-center justify-between px-20 xl:flex">
          <h2 className="max-w-[480px] font-['dtnightingale'] text-[56px] font-light leading-[1.1] text-white">
            Need Help? We&apos;re Happy to Guide You!
          </h2>

          <div className="glass-surface w-[520px] rounded-[24px] p-8">
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              {formFields.map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label
                    htmlFor={`${field.id}-desktop`}
                    className="font-['Raleway'] text-[14px] font-medium text-white"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`${field.id}-desktop`}
                    type={field.type}
                    className="w-full rounded-[12px] border border-white/30 bg-transparent px-4 py-3 font-['Raleway'] text-[14px] text-white outline-none placeholder:text-[#8e8e8e]"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message-desktop"
                  className="font-['Raleway'] text-[14px] font-medium text-white"
                >
                  What&apos;s on your mind?
                </label>
                <textarea
                  id="message-desktop"
                  rows={4}
                  className="w-full resize-none rounded-[12px] border border-white/30 bg-transparent px-4 py-3 font-['Raleway'] text-[14px] text-white outline-none placeholder:text-[#8e8e8e]"
                />
              </div>

              <GoldButton type="submit" className="mt-2 w-full">
                SEND
              </GoldButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
