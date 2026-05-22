FROM node:18-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 libnspr4 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 \
    libcups2 libdrm2 libxkbcommon0 libpango-1.0-0 libpangocairo-1.0-0 \
    libgbm1 libasound2 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci && npx playwright install --with-deps chromium

COPY . .

CMD ["npx", "playwright", "test", "--reporter=list"]