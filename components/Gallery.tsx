import Image from "next/image";
import { assets } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";

const galleryImages = [
  assets.gallery.image1,
  assets.gallery.image2,
  assets.gallery.image3,
  assets.gallery.image4,
  assets.gallery.image5,
] as const;

export default function Gallery() {
  return (
    <section className="flex w-full items-center justify-center bg-[#050b08] px-5 py-16 sm:px-8 md:px-10 lg:px-16 xl:h-[578px] xl:px-20 xl:py-0">
      <div className="flex w-full max-w-[1280px] flex-col gap-10 sm:gap-12 xl:gap-[70px]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading label="GALLERY" title="Find us on Instagram" />
          <button
            type="button"
            className="glass-surface shrink-0 rounded-[12px] px-5 py-3 sm:px-6 sm:py-4"
          >
            <span className="text-gradient-farm font-['BaskervvilleSC'] text-[16px] font-semibold sm:text-[18px]">
              @resetlife
            </span>
          </button>
        </div>

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:gap-5 sm:px-8 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16 xl:mx-0 xl:px-0 [&::-webkit-scrollbar]:hidden">
          {galleryImages.map((image, index) => (
            <div
              key={image}
              className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-[20px] sm:h-[210px] sm:w-[210px] sm:rounded-[22px] xl:h-[240px] xl:w-[240px] xl:rounded-[24px]"
            >
              <Image
                src={image}
                alt={`Reset Life gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
