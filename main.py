import asyncio
import json
from playwright.async_api import async_playwright
from datetime import datetime

TARGET = "https://idx.google.com/u/3/vps123-19246590"

async def fix_cookies(cookies):
    """Playwright formatına dönüştür."""
    fixed = []

    for c in cookies:
        new = {
            "name": c.get("name"),
            "value": c.get("value"),
            "domain": c.get("domain"),
            "path": c.get("path", "/"),
            "expires": c.get("expires", -1),
            "httpOnly": c.get("httpOnly", False),
            "secure": True,
            "sameSite": "None"
        }
        fixed.append(new)

    return fixed


async def start():
    print("Bot çalışıyor...")

    cookies_raw = json.load(open("cookies.json", "r", encoding="utf-8"))
    cookies = await fix_cookies(cookies_raw)

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-dev-shm-usage"]
        )

        context = await browser.new_context()
        await context.add_cookies(cookies)

        page = await context.new_page()

        while True:
            try:
                await page.goto(TARGET, wait_until="domcontentloaded")
                print(f"[{datetime.now()}] Sayfa yenilendi.")
            except Exception as e:
                print("HATA:", e)

            await asyncio.sleep(30)


asyncio.run(start())
