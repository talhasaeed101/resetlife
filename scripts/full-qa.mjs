import { chromium } from "playwright";

const URL = process.env.QA_URL ?? "http://localhost:3000";
const VIEWPORTS = [
  { width: 375, height: 812, label: "375px" },
  { width: 768, height: 1024, label: "768px" },
  { width: 1024, height: 900, label: "1024px" },
  { width: 1440, height: 900, label: "1440px" },
];

const EXPECTED_EMAIL_HREF = "mailto:resetlifefarmhouse@gmail.com";
const EXPECTED_WHATSAPP_HREF =
  "https://wa.me/923145156162?text=Hello%20Reset%20Life%20Farmhouse%2C%20I%27d%20like%20to%20know%20more%20about%20availability%20and%20bookings.";
const EXPECTED_INSTAGRAM_HREF = "https://www.instagram.com/resetlifefarmhouse/";

async function run() {
  const browser = await chromium.launch({ headless: false, slowMo: 250 });
  const results = [];

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: "no-preference",
      });
      const page = await context.newPage();
      const issues = [];

      await page.goto(URL, { waitUntil: "networkidle" });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      if (overflow.scrollWidth > overflow.innerWidth + 1) {
        issues.push(`horizontal overflow: ${overflow.scrollWidth}px`);
      }

      const calendarIcons = await page.evaluate(() => {
        const checkInRow = document
          .getElementById("check-in")
          ?.closest(".booking-control-row");
        const checkOutRow = document
          .getElementById("check-out")
          ?.closest(".booking-control-row");

        const countVisibleIcons = (row) => {
          if (!row) {
            return 0;
          }

          return row.querySelectorAll("img.booking-control-icon").length;
        };

        return {
          checkIn: countVisibleIcons(checkInRow),
          checkOut: countVisibleIcons(checkOutRow),
        };
      });

      if (calendarIcons.checkIn !== 1) {
        issues.push(`check-in has ${calendarIcons.checkIn} calendar icons`);
      }

      if (calendarIcons.checkOut !== 1) {
        issues.push(`check-out has ${calendarIcons.checkOut} calendar icons`);
      }

      const eventsBefore = await page.evaluate(() => {
        const row = document
          .getElementById("events")
          ?.querySelector(".overflow-x-auto");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      const testimonialBefore = await page.evaluate(() => {
        const row = document
          .getElementById("testimonial")
          ?.querySelector(".overflow-x-auto");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      const galleryBefore = await page.evaluate(() => {
        const row = document.querySelector(".gallery-carousel-track");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      await page.waitForTimeout(1800);

      const eventsAfter = await page.evaluate(() => {
        const row = document
          .getElementById("events")
          ?.querySelector(".overflow-x-auto");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      const testimonialAfter = await page.evaluate(() => {
        const row = document
          .getElementById("testimonial")
          ?.querySelector(".overflow-x-auto");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      const galleryAfter = await page.evaluate(() => {
        const row = document.querySelector(".gallery-carousel-track");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      if (eventsBefore >= 0 && eventsAfter <= eventsBefore) {
        issues.push("events auto-scroll stalled");
      }

      if (testimonialBefore >= 0 && testimonialAfter <= testimonialBefore) {
        issues.push("testimonial auto-scroll stalled");
      }

      if (galleryBefore >= 0) {
        const galleryDelta = Math.abs(galleryAfter - galleryBefore);
        const galleryWrapped =
          galleryAfter < galleryBefore && galleryAfter < galleryBefore * 0.35;

        if (galleryDelta < 2 && !galleryWrapped) {
          const galleryScrollable = await page.evaluate(() => {
            const row = document.querySelector(".gallery-carousel-track");
            if (!(row instanceof HTMLElement)) {
              return false;
            }

            return row.scrollWidth > row.clientWidth + 1;
          });

          if (galleryScrollable) {
            issues.push("gallery auto-scroll stalled");
          }
        }
      }

      const footerData = await page.evaluate(() => {
        const footer = document.querySelector("footer");
        return {
          emailHref: footer?.querySelector(".footer-email")?.getAttribute("href") ?? null,
          whatsappHref:
            footer?.querySelector(".footer-whatsapp")?.getAttribute("href") ?? null,
          whatsappTarget:
            footer?.querySelector(".footer-whatsapp")?.getAttribute("target") ?? null,
          instagramHref:
            footer
              ?.querySelector('a[aria-label*="Instagram"]')
              ?.getAttribute("href") ?? null,
          emailText: footer?.textContent?.includes("resetlifefarmhouse@gmail.com") ?? false,
        };
      });

      if (footerData.emailHref !== EXPECTED_EMAIL_HREF) {
        issues.push(`email href incorrect: ${footerData.emailHref}`);
      }

      if (footerData.whatsappHref !== EXPECTED_WHATSAPP_HREF) {
        issues.push(`whatsapp href incorrect: ${footerData.whatsappHref}`);
      }

      if (footerData.whatsappTarget !== "_blank") {
        issues.push("whatsapp target missing");
      }

      if (footerData.instagramHref !== EXPECTED_INSTAGRAM_HREF) {
        issues.push("instagram incorrect");
      }

      if (!footerData.emailText) {
        issues.push("email text incorrect");
      }

      const aboutHeadline = await page.evaluate(
        () => document.querySelector(".about-section__headline")?.textContent ?? "",
      );
      if (!aboutHeadline.includes("A Place to Slow Down")) {
        issues.push("about headline missing");
      }

      const faviconHref = await page
        .locator('link[rel="icon"]')
        .first()
        .getAttribute("href");
      if (!faviconHref?.includes("favicon") && !faviconHref?.includes("icon")) {
        issues.push("favicon missing");
      }

      const menuButton = page.getByRole("button", { name: /open menu|close menu/i });
      const menuVisible = await menuButton.isVisible();

      if (menuVisible) {
        await menuButton.click();
        await page.waitForTimeout(600);

        const dialog = page.getByRole("dialog", { name: /navigation menu/i });
        if (!(await dialog.isVisible())) {
          issues.push("menu did not open");
        } else {
          const glass = await page.evaluate(() => {
            const panel = document.querySelector(".mobile-menu-panel");
            if (!panel) {
              return null;
            }
            const styles = window.getComputedStyle(panel);
            return {
              blur:
                styles.backdropFilter ||
                styles.getPropertyValue("-webkit-backdrop-filter"),
            };
          });

          if (!glass?.blur || glass.blur === "none") {
            issues.push("menu glass blur missing");
          }

          await page.locator(".mobile-menu-close").click();
          await page.waitForTimeout(400);

          if (await dialog.isVisible().catch(() => false)) {
            issues.push("menu close button failed");
          }
        }
      }

      results.push({
        viewport: viewport.label,
        issues,
        pass: issues.length === 0,
      });

      await context.close();
    }
  } finally {
    await browser.close();
  }

  console.log("\n=== Reset Life QA ===\n");
  for (const result of results) {
    console.log(`${result.viewport}: ${result.pass ? "PASS" : "FAIL"}`);
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
