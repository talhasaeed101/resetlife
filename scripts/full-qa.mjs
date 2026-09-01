import { chromium, devices } from "playwright";

const URL = process.env.QA_URL ?? "http://localhost:3000";
const VIEWPORTS = [
  { width: 375, height: 812, label: "375px", mobile: true },
  { width: 390, height: 844, label: "390px", mobile: true },
  { width: 414, height: 896, label: "414px", mobile: true },
  { width: 768, height: 1024, label: "768px", mobile: false },
  { width: 1024, height: 900, label: "1024px", mobile: false },
  { width: 1440, height: 900, label: "1440px", mobile: false },
];

const EXPECTED_EMAIL_HREF = "mailto:resetlifefarmhouse@gmail.com";
const EXPECTED_WHATSAPP_HREF =
  "https://wa.me/923710525188?text=Hello%20Reset%20Life%20Farmhouse%2C%20I%27d%20like%20to%20know%20more%20about%20availability%20and%20bookings.";
const EXPECTED_INSTAGRAM_HREF = "https://www.instagram.com/resetlifefarmhouse/";

function carouselMoved(before, after) {
  if (before < 0 || after < 0) {
    return false;
  }

  const delta = Math.abs(after - before);
  const wrapped = after < before && after < before * 0.35;
  return delta >= 2 || wrapped;
}

async function readCarouselScroll(page, selector) {
  return page.evaluate((carouselSelector) => {
    const row = document.querySelector(carouselSelector);
    if (!(row instanceof HTMLElement)) {
      return { left: -1, scrollable: false };
    }

    return {
      left: row.scrollLeft,
      scrollable: row.scrollWidth > row.clientWidth + 1,
    };
  }, selector);
}

async function run() {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const results = [];

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        ...(viewport.mobile ? devices["iPhone 13"] : {}),
        viewport: { width: viewport.width, height: viewport.height },
        hasTouch: viewport.mobile,
        isMobile: viewport.mobile,
        reducedMotion: "no-preference",
      });
      const page = await context.newPage();
      const issues = [];

      await page.goto(URL, { waitUntil: "networkidle" });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await page.mouse.move(8, 8);

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      if (overflow.scrollWidth > overflow.innerWidth + 1) {
        issues.push(`horizontal overflow: ${overflow.scrollWidth}px`);
      }

      const calendarIcons = await page.evaluate(() => {
        const countVisibleIcons = (row) =>
          row ? row.querySelectorAll("img.booking-control-icon").length : 0;

        return {
          checkIn: countVisibleIcons(
            document.getElementById("check-in")?.closest(".booking-control-row"),
          ),
          checkOut: countVisibleIcons(
            document.getElementById("check-out")?.closest(".booking-control-row"),
          ),
        };
      });

      if (calendarIcons.checkIn !== 1) {
        issues.push(`check-in has ${calendarIcons.checkIn} calendar icons`);
      }

      if (calendarIcons.checkOut !== 1) {
        issues.push(`check-out has ${calendarIcons.checkOut} calendar icons`);
      }

      const menuButton = page.getByRole("button", { name: /open menu|close menu/i });
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(500);

        const dialog = page.getByRole("dialog", { name: /navigation menu/i });
        if (!(await dialog.isVisible())) {
          issues.push("menu did not open");
        } else {
          await page.locator(".mobile-menu-close").click();
          await page.waitForTimeout(400);
        }
      }

      await page.mouse.move(8, 8);
      await page.waitForTimeout(200);

      const galleryBefore = await readCarouselScroll(page, '[data-auto-scroll="gallery"]');
      const eventsBefore = await readCarouselScroll(page, '[data-auto-scroll="events"]');
      const testimonialBefore = await readCarouselScroll(
        page,
        '[data-auto-scroll="testimonial"]',
      );

      await page.waitForTimeout(1800);

      const galleryAfter = await readCarouselScroll(page, '[data-auto-scroll="gallery"]');
      const eventsAfter = await readCarouselScroll(page, '[data-auto-scroll="events"]');
      const testimonialAfter = await readCarouselScroll(
        page,
        '[data-auto-scroll="testimonial"]',
      );

      if (galleryBefore.scrollable && !carouselMoved(galleryBefore.left, galleryAfter.left)) {
        issues.push("gallery auto-scroll stalled");
      }

      if (eventsBefore.scrollable && !carouselMoved(eventsBefore.left, eventsAfter.left)) {
        issues.push("events auto-scroll stalled");
      }

      if (
        testimonialBefore.scrollable &&
        !carouselMoved(testimonialBefore.left, testimonialAfter.left)
      ) {
        issues.push("testimonial auto-scroll stalled");
      }

      const footerData = await page.evaluate(() => {
        const footer = document.querySelector("footer");
        return {
          emailHref: footer?.querySelector(".footer-email")?.getAttribute("href") ?? null,
          whatsappHref:
            footer?.querySelector(".footer-whatsapp")?.getAttribute("href") ?? null,
          instagramHref:
            footer
              ?.querySelector('a[aria-label*="Instagram"]')
              ?.getAttribute("href") ?? null,
        };
      });

      if (footerData.emailHref !== EXPECTED_EMAIL_HREF) {
        issues.push(`email href incorrect: ${footerData.emailHref}`);
      }

      if (footerData.whatsappHref !== EXPECTED_WHATSAPP_HREF) {
        issues.push(`whatsapp href incorrect: ${footerData.whatsappHref}`);
      }

      if (footerData.instagramHref !== EXPECTED_INSTAGRAM_HREF) {
        issues.push("instagram incorrect");
      }

      results.push({
        viewport: viewport.label,
        gallery: { before: galleryBefore.left, after: galleryAfter.left },
        events: { before: eventsBefore.left, after: eventsAfter.left },
        testimonial: { before: testimonialBefore.left, after: testimonialAfter.left },
        issues,
        pass: issues.length === 0,
      });

      await context.close();
    }
  } finally {
    await browser.close();
  }

  console.log("\n=== Reset Life Carousel QA ===\n");
  for (const result of results) {
    console.log(`${result.viewport}: ${result.pass ? "PASS" : "FAIL"}`);
    console.log(
      `  gallery ${result.gallery.before} -> ${result.gallery.after} | events ${result.events.before} -> ${result.events.after} | testimonial ${result.testimonial.before} -> ${result.testimonial.after}`,
    );
    for (const issue of result.issues) {
      console.log(`  - ${issue}`);
    }
  }

  process.exit(results.some((result) => !result.pass) ? 1 : 0);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
