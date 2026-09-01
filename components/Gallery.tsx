import Image from "next/image";
import { assets } from "@/lib/assets";
import { SITE } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const galleryImages = [
  assets.gallery.image1,
  assets.gallery.image2,
  assets.gallery.image3,
  assets.gallery.image4,
  assets.gallery.image5,
] as const;

const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/resetlifefarmhouse?igsi=MXVkbWVqYmJha2Jmcg%3D%3D&utm_source=qr";

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-section__inner">
        <div className="gallery-section__header">
          <SectionHeading label="GALLERY" title="Find us on Instagram" />
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-instagram-cta glass-effect"
            aria-label={`${SITE.instagramLabel} on Instagram`}
          >
            <span className="text-gradient-farm font-['BaskervvilleSC'] text-[16px] font-semibold leading-none sm:text-[18px]">
              {SITE.instagramHandle}
            </span>
          </a>
        </div>

        <div className="gallery-carousel-viewport">
          <div className="gallery-carousel-track">
            {galleryImages.map((image, index) => (
              <article key={image} className="gallery-card">
                <div className="gallery-card__media">
                  <Image
                    src={image}
                    alt={`Reset Life gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
                    draggable={false}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
