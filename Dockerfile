FROM node:16

RUN apt-get update

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

RUN apt update && apt install tzdata -y
ENV TZ="America/Sao_Paulo"

WORKDIR /usr/src/app

# Install Puppeteer under /node_modules so it's available system-wide
COPY package*.json ./
COPY *.json . 

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
# COPY .env ./

RUN npm install pm2 -g
RUN npm install
RUN npx prisma generate
COPY tsconfig.json .
COPY src ./src 
RUN npm run build

ENV PM2_PUBLIC_KEY KEY_PUBLIC_HERE
ENV PM2_SECRET_KEY KEY_SECRET_HERE

COPY . .

EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
