FROM node:18-slim

RUN apt-get update && apt-get install -y wget gnupg \
    && apt-get install -y chromium

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]
