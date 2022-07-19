import { Bot } from './modules/Bot/Bot';

const BotId = 'BOT_ID_HERE';
const triboChatId = 'CHAT_ID_HERE';

const CronSendTile = String(process.env.CRON_SENDTILE);
const CronCheckTile = String(process.env.CRON_CHECKTILE);

const bot = new Bot(BotId, triboChatId, CronSendTile, CronCheckTile);

bot.InitPageBlaze();

(async () => {
  await bot.initialize("> Schedule > Bot - Start");
})()