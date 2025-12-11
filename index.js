import { chromium } from "playwright";
import fs from "fs";

const TARGET = "https://idx.google.com/u/3/vps123-19246590";

// cookies.json yükle
const cookies = JSON.parse(fs.readFileSync("./cookies.json", "utf-8"));

async function start() {
    console.log("Bot başlatılıyor...");

    // Playwright tarayıcı
    const browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-dev-shm-usage"]
    });

    const context = await browser.newContext();
    await context.addCookies(cookies);

    const page = await context.newPage();

    while (true) {
        try {
            await page.goto(TARGET, { waitUntil: "commit" });
            console.log(`[OK] Sayfa yenilendi: ${new Date().toLocaleString()}`);
        } catch (e) {
            console.log("Hata:", e.message);
        }

        // 45 saniyede bir yenile
        await new Promise(r => setTimeout(r, 45000));
    }
}

start();
