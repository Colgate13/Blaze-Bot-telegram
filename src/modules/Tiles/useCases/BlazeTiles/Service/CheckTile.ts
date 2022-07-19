import TilesRepository from '../../../../../shared/infra/prisma/repositories/TilesRepository';
import { HistoryTilesRaw, Tiles } from '../../../../PredictTiles/domain/TilesBlaze';

interface ICheckTile {
  win: boolean;
  messageId: number;
  date: string;
  colorMessage: string;
  error?: boolean;
}
export default class CheckTile {

  static async check(tilesRaw: HistoryTilesRaw[],
    icons: { black: string, white: string, red: string }
  ): Promise<ICheckTile> {
    let messageColor = '';

    const dbTiles = await TilesRepository.getTileLastUnCheck();

    if (!dbTiles) {
      return {
        win: false,
        messageId: 0,
        date: '',
        colorMessage: '',
        error: true
      };
    }

    const gales = (new Tiles(tilesRaw)).lastFive;

    for (let i = 0; i < 3; i++) {
      if (gales[i].color === dbTiles.colorSend) {
        switch (gales[i].color) {
          case 'black':
            messageColor = `${icons.black} + ${icons.white}`;
            break;
          case 'red':
            messageColor = `${icons.red} + ${icons.white}`;
            break;
          case 'white':
            messageColor = `${icons.white}`;
            break;
          default:
            messageColor = '';
        }

        return {
          win: true,
          messageId: dbTiles.messageId,
          date: dbTiles.dateSend,
          colorMessage: messageColor,
          error: false
        };
      }
    }

    return {
      win: false,
      messageId: 0,
      date: '',
      colorMessage: '',
      error: true
    };
  }
}
