import { chromium } from "playwright";

const URL = process.env.QA_URL ?? "http://localhost:3001";
const VIEWPORTS = [
  { width: 375, height: 812, label: "375px mobile" },
  { width: 768, height: 1024, label: "768px tablet" },
  { width: 1440, height: 900, label: "1440px desktop" },
];

async function run() {
  const browser = await chromium.launch({ headless: false, slowMo: 350 });
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
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      if (overflow.scrollWidth > overflow.innerWidth + 1) {
        issues.push(
          `horizontal overflow: ${overflow.scrollWidth}px > ${overflow.innerWidth}px`,
        );
      }

      if (viewport.width < 1280) {
        const menuButton = page.getByRole("button", { name: /open menu/i });
        await menuButton.scrollIntoViewIfNeeded();
        await menuButton.click({ force: false });
        await page.waitForTimeout(500);

        const dialog = page.getByRole("dialog", { name: /navigation menu/i });
        const dialogVisible = await dialog.isVisible();
        if (!dialogVisible) {
          issues.push("mobile menu dialog did not open");
        }

        const glassStyles = await page.evaluate(() => {
          const panel = document.querySelector(".glass-panel");
          if (!panel) {
            return null;
          }
          const styles = window.getComputedStyle(panel);
          return {
            backdropFilter: styles.backdropFilter || styles.webkitBackdropFilter,
            background: styles.backgroundColor,
            border: styles.border,
          };
        });

        if (!glassStyles?.backdropFilter || glassStyles.backdropFilter === "none") {
          issues.push("glass-panel missing backdrop-filter");
        }

        await page.getByRole("dialog").getByRole("button", { name: /about/i }).click();
        await page.waitForTimeout(900);

        const aboutInView = await page.evaluate(() => {
          const section = document.getElementById("about");
          if (!section) {
            return false;
          }
          const rect = section.getBoundingClientRect();
          return rect.top >= -80 && rect.top <= 200;
        });

        if (!aboutInView) {
          issues.push("About navigation scroll did not reach section");
        }

        const menuClosed = !(await dialog.isVisible().catch(() => true));
        if (!menuClosed) {
          issues.push("menu did not close after navigation click");
        }
      }

      const emailText = await page.locator("footer").textContent();
      if (!emailText?.includes("resetlifefarmhouse@gmail.com")) {
        issues.push("footer email not updated");
      }

      const instagramHref = await page
        .locator('footer a[aria-label*="Instagram"]')
        .getAttribute("href");
      if (instagramHref !== "https://www.instagram.com/resetlifefarmhouse/") {
        issues.push(`footer instagram href incorrect: ${instagramHref}`);
      }

      const galleryInstagram = await page
        .locator('#gallery a[aria-label*="Instagram"]')
        .getAttribute("href");
      if (galleryInstagram !== "https://www.instagram.com/resetlifefarmhouse/") {
        issues.push(`gallery instagram href incorrect: ${galleryInstagram}`);
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

  console.log("\n=== Reset Life Menu & Functionality QA ===\n");
  for (const result of results) {
    console.log(`${result.viewport}: ${result.pass ? "PASS" : "FAIL"}`);
    for (const issue of result.issues) {
      console.log(`  - ${issue}`);
    }
  }

  const failed = results.some((result) => !result.pass);
  process.exit(failed ? 1 : 0);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
