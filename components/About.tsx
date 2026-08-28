"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { useInViewAnimation } from "@/lib/useInViewAnimation";

const aboutHeadline = "A Place to Slow Down,\nReconnect, and Simply Be.";

const aboutCopy =
  "Reset Life is a peaceful escape designed to help you slow down, breathe deeply, and reconnect with what truly matters. Surrounded by nature and away from the noise of everyday life, it sets the perfect tone for an unhurried stay.";

export default function About() {
  const { ref, isVisible } = useInViewAnimation({ threshold: 0.18 });

  return (
    <section id="about" className="about-section">
      <div
        ref={ref}
        className={`about-section__inner ${isVisible ? "about-section__inner--visible" : ""}`}
      >
        <div className="about-section__visuals">
          <div className="about-section__main-image">
            <Image
              src={assets.about.image1}
              alt="Reset Life farmhouse exterior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 52vw, 560px"
              priority
            />
          </div>

          <div className="about-section__supporting about-section__supporting--one">
            <Image
              src={assets.about.image3}
              alt="Reset Life estate garden"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 42vw, 220px"
            />
          </div>

          <div className="about-section__supporting about-section__supporting--two">
            <Image
              src={assets.about.image2}
              alt="Reset Life interior detail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 36vw, 180px"
            />
          </div>
        </div>

        <div className="about-section__content">
          <p className="about-section__eyebrow">About Reset Life</p>
          <h2 className="about-section__headline">
            {aboutHeadline.split("\n").map((line, index) => (
              <span key={line}>
                {line}
                {index === 0 ? <br /> : null}
              </span>
            ))}
          </h2>
          <p className="about-section__copy">{aboutCopy}</p>
        </div>
      </div>
    </section>
  );
}
