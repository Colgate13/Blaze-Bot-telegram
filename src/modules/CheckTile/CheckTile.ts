import TilesRepository from '../../shared/infra/prisma/repositories/TilesRepository';
import { HistoryTilesRaw, Tiles } from '../PredictTiles/domain/TilesBlaze';

interface ICheckTile {
  win: boolean;
  id: string;
  messageId: number;
  colorSend: string;
  gale: number;
  date: string;
  error?: boolean;
}

export default class CheckTile {

  static async check(tilesRaw: HistoryTilesRaw[]): Promise<ICheckTile> {

    const dbTiles = await TilesRepository.getTileLastUnCheck();

    if (!dbTiles) {
      return {
        win: false,
        id: '',
        messageId: 0,
        colorSend: '',
        gale: 0,
        date: '',
        error: true
      };
    }

    const [gale1, gale2, gale3] = (new Tiles(tilesRaw)).lastFive;

    if (gale1.color == dbTiles.colorSend || dbTiles.colorSend == 'white') {
      await TilesRepository.insetCheckTrue(dbTiles.id);

      return {
        win: true,
        id: dbTiles.id,
        messageId: dbTiles.messageId,
        colorSend: dbTiles.colorSend,
        gale: 1,
        date: dbTiles.dateSend
      };
    }
    else if (gale2.color == dbTiles.colorSend || dbTiles.colorSend == 'white') {
      await TilesRepository.insetCheckTrue(dbTiles.id);

      return {
        win: true,
        id: dbTiles.id,
        messageId: dbTiles.messageId,
        colorSend: dbTiles.colorSend,
        gale: 2,
        date: dbTiles.dateSend
      };
    } else if (gale3.color == dbTiles.colorSend || dbTiles.colorSend == 'white') {
      await TilesRepository.insetCheckTrue(dbTiles.id);

      return {
        win: true,
        id: dbTiles.id,
        messageId: dbTiles.messageId,
        colorSend: dbTiles.colorSend,
        gale: 3,
        date: dbTiles.dateSend

      };
    }

    return {
      win: false,
      id: '',
      messageId: 0,
      colorSend: '',
      gale: 0,
      date: '',
      error: true
    };
  }
}
