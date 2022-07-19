# Blaze-bot-telegram

<h1 align="center">Bot blaze completo</h1>

<p align="center">
  <a href="#about">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Examples">Examples</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Run">Functions</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

## Sobre

<div id="Sobre"></div>

Bot para blaze.com completo, com webscraping, cálculo de previsão de saida e integração com telegram API. (Feito apenas para estudos)

## Tecnologias 🐱‍🏍🎂

<div id="Tecnologias"></div>

- [Node](http://nodejs.org/) - Nodejs
- [typescript](https://www.typescriptlang.org/) - Super Javascript
- [cheerio](https://cheerio.js.org/) - Web scraping kit
- [puppeteer](https://www.npmjs.com/package/puppeteer) - Super Web scraping kit

### Features

<div id="Features"></div>

- [x] [Webscraping](#Webscraping)
- [x] [Telegram API](#Telegram)
- [x] [Cálculo de Previsão](#Calculo)

<div id="Run"></div>

## Run!

_You can run with dockerfile_

run migrations

```Prisma
npx prisma migrate dev --name init
```

Edit file src/schedule.ts;

```js
const BotId = "BOT_ID_HERE";
const triboChatId = "CHAT_ID_HERE";
```

Running

```npm
npm run build
npm run start
```

## License

<div id="license"></div>

MIT [LICENSE](LICENSE.md)
