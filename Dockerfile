# Playwright resmi image (Chromium hazır)
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Çalışma dizini
WORKDIR /app

# Package dosyalarını kopyala
COPY package.json package-lock.json* ./

# Node modüllerini kur
RUN npm install

# Tüm dosyaları ekle
COPY . .

# Railway için port önemli değil — Express yok
# Ama image standardı için ekliyoruz
EXPOSE 3000

# Botu başlat
CMD ["npm", "start"]
