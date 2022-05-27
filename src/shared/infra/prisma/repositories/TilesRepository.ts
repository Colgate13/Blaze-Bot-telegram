import { prisma } from '../client';

interface ITile {
  messageId: number;
  chatId: string;
  dateSend: string;
  colorSend: string;
  check: boolean;
}

export default class TilesRepository {

  static async getAllTiles() {
    const tiles = await prisma.tiles.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tiles;
  }

  static async getAllTilesOfDay(date: string, DateUnix = true) {
    if (DateUnix) {
      return await prisma.tiles.findMany({
        where: {
          createdAt: {
            gt: date,
          }
        }
      });
    } else {
      return await prisma.tiles.findMany({
        where: {
          createdAt: {
            gt: new Date(date).toISOString(),
          }
        }
      });
    }
  }

  static async getTileById(tileId: string) {
    return await prisma.tiles.findUnique({
      where: {
        id: tileId
      }
    });
  }

  static async getTileLastUnCheck() {
    return await prisma.tiles.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        check: false,
      },
      take: 3
    });
  }

  static async insetTile({
    chatId, messageId, dateSend, colorSend
  }: ITile) {
    return await prisma.tiles.create({
      data: {
        chatId,
        messageId,
        dateSend,
        colorSend,
        check: false
      }
    });
  }

  static async insetCheckTrue(TileId: string) {
    return await prisma.tiles.update({
      where: {
        id: TileId
      },
      data: {
        check: true
      }
    });
  }
}
