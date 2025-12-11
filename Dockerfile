FROM python:3.10-slim

WORKDIR /app

# Sistem bağımlılıklarını kur (Playwright'ın istediği minimum)
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg \
    libnss3 \
    libatk1.0-0 \
    libcups2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libxfixes3 \
    libxext6 \
    libglib2.0-0 \
    libgbm1 \
    libpango-1.0-0 \
    libasound2 \
    libgtk-3-0 \
    fonts-liberation \
    fonts-dejavu-core \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Chromium sadece browser modelini indirir = HATALI OLMAYAN YÖNTEM
RUN playwright install chromium

COPY . .

CMD ["python", "main.py"]
