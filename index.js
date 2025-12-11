import { chromium } from "playwright";
import fs from "fs";

const TARGET = "https://idx.google.com/u/3/vps123-90523144";

// Cookie dosyasını yükle
const cookies = JSON.parse(fs.readFileSync("./cookies.json", "utf-8"));

(async () => {
    const browser = await chromium.launch({
        headless: true
    });

    const context = await browser.newContext();

    // Cookies yükle (Google girişini simüle eder)
    await context.addCookies(cookies);

    const page = await context.newPage();

    while (true) {
        try {
            await page.goto(TARGET, { waitUntil: "domcontentloaded" });
            console.log(`[${new Date().toLocaleString()}] Sayfa yenilendi.`);
        } catch (err) {
            console.error("Hata:", err);
        }

        await new Promise(r => setTimeout(r, 30000)); // 30 saniye
    }
})();
