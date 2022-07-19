import cron from 'node-cron';
import { Page } from 'puppeteer';
import { Scraping } from '../../modules/Tiles/useCases/BlazeTiles/Service/index'
import { icons } from '../../shared/config/Icons';
import { RawMessage } from '../../shared/config/messageModel';
import CheckTile from '../Tiles/useCases/BlazeTiles/Service/CheckTile';
import BotMessages from '../../modules/Bot/BotMessages';

export class Bot {

  protected botId: string;
  protected triboChatId: string;
  protected CronSendTile: string;
  protected CronCheckTile: string;
  private BlazePage: Page = {} as Page;

  constructor(
    botId: string,
    triboChatId: string,
    CronSendTile: string,
    CronCheckTile: string
  ) {
    this.botId = botId;
    this.triboChatId = triboChatId;
    this.CronSendTile = CronSendTile;
    this.CronCheckTile = CronCheckTile;
  }

  public async InitPageBlaze() {
    (async () => {
      this.BlazePage = await Scraping.scrapingSocket();
    })();

    return this.BlazePage;
  }

  public async initialize(Name: string) {
    console.log(`> Server - Initialize -> ${Name}`);
    console.log(`> Server - Initialize -> this.CronSendTile: ${this.CronSendTile}`);
    console.log(`> Server - Initialize -> this.CronCheckTile: ${this.CronCheckTile}`);

    cron.schedule(this.CronSendTile, async () => {
      BotMessages.sendPredictOne(
        this.botId,
        this.triboChatId,
        await Scraping.getTilesSocket(this.BlazePage));
    });

    cron.schedule(this.CronCheckTile, async () => {
      const check = await CheckTile.check(
        await Scraping.getTilesSocket(this.BlazePage), {
        black: icons.black,
        white: icons.white,
        red: icons.red
      });

      if (check?.error)
        return 0;

      console.log(check);

      let message = RawMessage.replace('$date', check.date);
      message = message.replace('$icon', check.colorMessage);

      if (check.win === true) {
        BotMessages.updateMessage(message + `\n WIN ${icons.win}${icons.win}${icons.win}`, check.messageId, this.botId, this.triboChatId);
      } else if (check.win === false) {
        BotMessages.updateMessage(message + `\n LOSS ${icons.loss}${icons.loss}${icons.loss}`, check.messageId, this.botId, this.triboChatId);
      }
    });
  }
}