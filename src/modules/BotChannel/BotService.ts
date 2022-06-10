import { bot } from './bot';
import { Telegraf, ISend } from '../Telegraf/telegraf'
import TilesRepository from '../../shared/infra/prisma/repositories/TilesRepository';
import { HistoryTilesRaw } from '../PredictTiles/domain/TilesBlaze';

class BotService {
    static async sendPredictOne(TOKEN: string, chatId: string, tilesRaw: HistoryTilesRaw[], IdPredict = 1): Promise<ISend> {
        const {
            colorSend, dateSend, message
        } = await bot.sendPredict(IdPredict, tilesRaw);

        const messageSend = await new Telegraf(TOKEN).send(message, chatId);

        await TilesRepository.insetTile({
            chatId: messageSend.chatId,
            messageId: messageSend.messageId,
            dateSend: dateSend,
            colorSend: colorSend,
            check: false
        });

        return messageSend;
    }

    static async sendMessage(message: string, TOKEN: string, chatId: string): Promise<ISend> {
        return await new Telegraf(TOKEN).send(message, chatId);
    }

    static async updateMessage(textUpdated: string, message_id: number, TOKEN: string, chatId: string): Promise<any> {
        return await new Telegraf(TOKEN).update(chatId, message_id, textUpdated);
    }

}

export default BotService;