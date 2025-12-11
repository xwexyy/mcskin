import fs from "fs";

try {
    const raw = fs.readFileSync("./cookies.json", "utf-8");
    const cookies = JSON.parse(raw);

    const fixed = cookies.map(c => ({
        ...c,
        sameSite: "None",  // Playwright için zorunlu format
        secure: true       // Google için zorunlu
    }));

    fs.writeFileSync("./cookies-fixed.json", JSON.stringify(fixed, null, 2));
    console.log("✔ cookies-fixed.json oluşturuldu!");
} catch (err) {
    console.error("Cookie düzeltme hatası:", err);
}
