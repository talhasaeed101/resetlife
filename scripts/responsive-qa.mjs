import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const VIEWPORTS = [1440, 1280, 1024, 768, 480, 375, 320];
const URL = "http://localhost:3000";
const SECTIONS = [
  "Hero",
  "About",
  "Villa",
  "Events",
  "Gallery",
  "Testimonial",
  "FAQ",
  "CTA",
  "Footer",
];

const OUT_DIR = path.join(process.cwd(), "qa-screenshots");

async function auditPage(page, width) {
  return page.evaluate((sectionNames) => {
    const issues = [];
    const doc = document.documentElement;
    const body = document.body;

    if (doc.scrollWidth > window.innerWidth + 1) {
      issues.push({
        type: "horizontal-overflow",
        detail: `scrollWidth ${doc.scrollWidth}px > viewport ${window.innerWidth}px`,
      });
    }

    const overflowing = [];
    body.querySelectorAll("*").forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      const style = getComputedStyle(el);
      if (style.position === "fixed" || style.visibility === "hidden") return;
      if (rect.right > window.innerWidth + 2 || rect.left < -2) {
        const tag = `${el.tagName.toLowerCase()}${el.className ? `.${String(el.className).split(" ").slice(0, 2).join(".")}` : ""}`;
        overflowing.push(tag);
      }
    });

    if (overflowing.length > 0) {
      issues.push({
        type: "elements-outside-viewport",
        detail: [...new Set(overflowing)].slice(0, 8).join(", "),
      });
    }

    const brokenImages = [...document.images].filter(
      (img) => !img.complete || img.naturalWidth === 0,
    );
    if (brokenImages.length > 0) {
      issues.push({
        type: "broken-images",
        detail: brokenImages.map((img) => img.src).join(", "),
      });
    }

    const main = document.querySelector("main");
    const sectionEls = main?.children ?? [];
    sectionNames.forEach((name, i) => {
      const el = sectionEls[i];
      if (!el) {
        issues.push({ type: "missing-section", detail: name });
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.height < 40) {
        issues.push({
          type: "collapsed-section",
          detail: `${name} height ${Math.round(r.height)}px`,
        });
      }
    });

    return issues;
  }, SECTIONS);
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(window.innerHeight * 0.85, 300);
    let y = 0;
    const max = document.documentElement.scrollHeight;
    while (y < max) {
      window.scrollTo(0, y);
      await delay(120);
      y += step;
    }
    window.scrollTo(0, 0);
    await delay(200);
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: false,
    slowMo: 250,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  const allResults = [];

  console.log("\n=== Reset Life Responsive QA ===\n");
  console.log(`Testing: ${URL}`);
  console.log(`Browser window is VISIBLE — watch viewport changes.\n`);

  for (const width of VIEWPORTS) {
    const height = width >= 1024 ? 900 : width >= 768 ? 1024 : 812;
    await page.setViewportSize({ width, height });
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(800);
    await scrollThrough(page);

    const issues = await auditPage(page, width);
    const shot = path.join(OUT_DIR, `homepage-${width}px.png`);
    await page.screenshot({ path: shot, fullPage: true });

    allResults.push({ width, height, issues, screenshot: shot });
    console.log(`--- ${width}px x ${height}px ---`);
    if (issues.length === 0) {
      console.log("  PASS — no issues detected");
    } else {
      issues.forEach((issue) => {
        console.log(`  ISSUE [${issue.type}]: ${issue.detail}`);
      });
    }
    console.log(`  Screenshot: ${shot}\n`);
    await page.waitForTimeout(1500);
  }

  await browser.close();

  console.log("\n=== SUMMARY ===\n");
  for (const r of allResults) {
    const status = r.issues.length === 0 ? "PASS" : `FAIL (${r.issues.length})`;
    console.log(`${r.width}px: ${status}`);
  }

  const failed = allResults.filter((r) => r.issues.length > 0);
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
