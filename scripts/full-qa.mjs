import { chromium } from "playwright";

const URL = process.env.QA_URL ?? "http://localhost:3000";
const VIEWPORTS = [
  { width: 375, height: 812, label: "375px" },
  { width: 768, height: 1024, label: "768px" },
  { width: 1024, height: 900, label: "1024px" },
  { width: 1440, height: 900, label: "1440px" },
];

async function run() {
  const browser = await chromium.launch({ headless: false, slowMo: 250 });
  const results = [];

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
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

      await page.waitForTimeout(1200);

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

      if (eventsBefore >= 0 && eventsAfter <= eventsBefore) {
        issues.push("events auto-scroll stalled");
      }

      if (testimonialBefore >= 0 && testimonialAfter <= testimonialBefore) {
        issues.push("testimonial auto-scroll stalled");
      }

      const emailOk = (await page.locator("footer").textContent())?.includes(
        "resetlifefarmhouse@gmail.com",
      );
      if (!emailOk) {
        issues.push("email incorrect");
      }

      const instagramHref = await page
        .locator('footer a[aria-label*="Instagram"]')
        .getAttribute("href");
      if (instagramHref !== "https://www.instagram.com/resetlifefarmhouse/") {
        issues.push("instagram incorrect");
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
