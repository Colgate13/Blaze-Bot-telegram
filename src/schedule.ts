import cron from 'node-cron';
import Bot from './modules/BotChannel/BotService';
import { Scraping } from './modules/Tiles/useCases/BlazeTiles/Service/index'
import { Page } from 'puppeteer';
import CheckTile from './modules/CheckTile/CheckTile';
import { RawMessage } from './shared/config/messageModel';
import { icons } from './shared/config/Icons';

const BotId = '5264066036:AAE2ig6Pd0EleCvKCoJokA7NvrG6aFSWb5k';
const triboChatId = '-1001579922039';

let BlazePage: Page;

try {
  (async () => {
    BlazePage = await Scraping.scrapingSocket();

  })();
} catch (error) {
  console.error(error);
}
console.log("> Server - Start")

cron.schedule('0 0 */3 * * *', async () => {
  console.log("> Server - Reloading the page");
  try {
    (async () => {
      BlazePage = await Scraping.scrapingSocket();

    })();
  } catch (error) {
    console.error(error);
  }
});

cron.schedule('10,20,30,40,50,59 * * * *', async () => {

  Bot.sendPredictOne(BotId, triboChatId, await Scraping.getTilesSocket(BlazePage));

});

cron.schedule('33 0,11,21,31,41,51 * * * *', async () => {

  const check = await CheckTile.check(await Scraping.getTilesSocket(BlazePage));

  if (check?.error)
    return 0;

  let message = RawMessage.replace('$date', check.date);

  switch (check.colorSend) {
    case 'black':
      message = message.replace('$icon', `${icons.black} + ${icons.white}`);
      break;
    case 'red':
      message = message.replace('$icon', `${icons.red} + ${icons.white}`);
      break;
    case 'white':
      message = message.replace('$icon', `${icons.white} + ${icons.white}`);
      break;
    default:
      message.replace('$icon', '');
  }
  if (check.win) {
    Bot.updateMessage(message + `\n WIN ${icons.win}${icons.win}${icons.win}`, check.messageId, BotId, triboChatId);
  } else {
    Bot.updateMessage(message + `\n LOSS ${icons.loss}${icons.loss}${icons.loss}`, check.messageId, BotId, triboChatId);
  }
});
