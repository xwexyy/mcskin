import { chromium } from "playwright";
import fs from "fs";
import express from "express";

const TARGET = "https://idx.google.com/u/3/vps123-19246590";

// Cookie dosyasını yükle
const cookies = JSON.parse(fs.readFileSync("./cookies.json", "utf-8"));

async function startBot() {
    const browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-dev-shm-usage"]
    });

    const context = await browser.newContext();
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
}

// BOT’U ARKA PLANDA ÇALIŞTIR
startBot();

// RAILWAY'İ ONLINE TUTAN SERVER
const app = express();
app.get("/", (req, res) => res.send("Bot aktif!"));
app.listen(process.env.PORT || 3000, () => console.log("Server açık!"));
