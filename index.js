import { chromium } from "playwright";
import fs from "fs";
import express from "express";

const TARGET = "https://idx.google.com/u/3/vps123-19246590";

// Cookie yüklemesi güvenli hale getirildi
let cookies = [];
try {
    cookies = JSON.parse(fs.readFileSync("./cookies.json", "utf-8"));
    console.log("Cookies yüklendi.");
} catch (e) {
    console.error("Cookies okunamadı:", e);
}

async function startBot() {
    const browser = await chromium.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--disable-dev-tools"
        ]
    });

    const context = await browser.newContext();
    await context.addCookies(cookies);

    const page = await context.newPage();

    // Sürekli yenileme döngüsü
    while (true) {
        try {
            await page.goto(TARGET, { waitUntil: "domcontentloaded", timeout: 60000 });

            console.log(`[${new Date().toLocaleString()}] → Sayfa yenilendi.`);
        } catch (err) {
            console.error("Sayfa yenileme hatası:", err);
        }

        // 30 saniye bekle
        await page.waitForTimeout(30000);
    }
}

// BOT’U ARKA PLANDA ÇALIŞTIR
startBot().catch(err => console.error("Bot başlatılamadı:", err));

// RAILWAY'İ ONLINE TUTMAK İÇİN EXPRESS SERVER
const app = express();

app.get("/", (req, res) => {
    res.send("Bot aktif! ✔️");
});

// Railway PORT değişkeni otomatik olarak set eder
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server çalışıyor → Port: ${port}`);
});
