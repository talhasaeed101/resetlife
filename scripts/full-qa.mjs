import { chromium } from "playwright";

const URL = process.env.QA_URL ?? "http://localhost:3000";
const VIEWPORTS = [
  { width: 375, height: 812, label: "375px mobile" },
  { width: 768, height: 1024, label: "768px tablet" },
  { width: 1440, height: 900, label: "1440px desktop" },
];

async function run() {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
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
      await page.waitForTimeout(400);

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      if (overflow.scrollWidth > overflow.innerWidth + 1) {
        issues.push(
          `horizontal overflow: ${overflow.scrollWidth}px > ${overflow.innerWidth}px`,
        );
      }

      const eventsScrollBefore = await page.evaluate(() => {
        const section = document.getElementById("events");
        const row = section?.querySelector(".overflow-x-auto");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      const testimonialScrollBefore = await page.evaluate(() => {
        const section = document.getElementById("testimonial");
        const row = section?.querySelector(".overflow-x-auto");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      await page.waitForTimeout(1200);

      const eventsScrollAfter = await page.evaluate(() => {
        const section = document.getElementById("events");
        const row = section?.querySelector(".overflow-x-auto");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      const testimonialScrollAfter = await page.evaluate(() => {
        const section = document.getElementById("testimonial");
        const row = section?.querySelector(".overflow-x-auto");
        return row instanceof HTMLElement ? row.scrollLeft : -1;
      });

      if (eventsScrollBefore >= 0 && eventsScrollAfter <= eventsScrollBefore) {
        issues.push("events auto-scroll did not advance");
      }

      if (
        testimonialScrollBefore >= 0 &&
        testimonialScrollAfter <= testimonialScrollBefore
      ) {
        issues.push("testimonial auto-scroll did not advance");
      }

      const emailOk = (await page.locator("footer").textContent())?.includes(
        "resetlifefarmhouse@gmail.com",
      );
      if (!emailOk) {
        issues.push("footer email missing");
      }

      const instagramHref = await page
        .locator('footer a[aria-label*="Instagram"]')
        .getAttribute("href");
      if (instagramHref !== "https://www.instagram.com/resetlifefarmhouse/") {
        issues.push(`instagram href incorrect: ${instagramHref}`);
      }

      const faviconHref = await page
        .locator('link[rel="icon"]')
        .first()
        .getAttribute("href");
      if (!faviconHref?.includes("favicon") && !faviconHref?.includes("icon")) {
        issues.push(`favicon link missing: ${faviconHref}`);
      }

      if (viewport.width < 1280) {
        const menuButton = page.getByRole("button", { name: /open menu/i });
        await menuButton.scrollIntoViewIfNeeded();
        await menuButton.click();
        await page.waitForTimeout(600);

        const dialog = page.getByRole("dialog", { name: /navigation menu/i });
        if (!(await dialog.isVisible())) {
          issues.push("mobile menu did not open");
        }

        const glass = await page.evaluate(() => {
          const panel = document.querySelector(".mobile-menu-panel");
          if (!panel) {
            return null;
          }
          const styles = window.getComputedStyle(panel);
          return {
            backdropFilter:
              styles.backdropFilter || styles.getPropertyValue("-webkit-backdrop-filter"),
            background: styles.backgroundColor,
            border: styles.border,
          };
        });

        if (!glass?.backdropFilter || glass.backdropFilter === "none") {
          issues.push("mobile menu glass blur missing");
        }

        await page.getByRole("dialog").getByRole("button", { name: /^about$/i }).click();
        await page.waitForTimeout(900);

        const aboutVisible = await page.evaluate(() => {
          const section = document.getElementById("about");
          if (!section) {
            return false;
          }
          const rect = section.getBoundingClientRect();
          return rect.top >= -120 && rect.top <= 220;
        });

        if (!aboutVisible) {
          issues.push("about scroll failed");
        }

        if (await dialog.isVisible().catch(() => false)) {
          issues.push("menu did not close after nav click");
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

  console.log("\n=== Reset Life Full QA ===\n");
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
