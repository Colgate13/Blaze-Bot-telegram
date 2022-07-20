import { Bot } from './modules/Bot/Bot';
import dotenv from 'dotenv';

dotenv.config();

const BotId = String(process.env.BOT_ID) || 'BOT_ID_HERE';
const ChatId = String(process.env.CHAT_ID) || 'CHAT_ID_HERE';

const CronSendTile = String(process.env.CRON_SENDTILE);
const CronCheckTile = String(process.env.CRON_CHECKTILE);

const bot = new Bot(BotId, ChatId, CronSendTile, CronCheckTile);

bot.InitPageBlaze();

(async () => {
  await bot.initialize("> Schedule > Bot - Start");
})()