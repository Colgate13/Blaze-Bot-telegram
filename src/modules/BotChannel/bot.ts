import PredictTiles from '../PredictTiles/PredictTiles';
import { HistoryTilesRaw } from '../PredictTiles/domain/TilesBlaze';
import { RawMessage } from '../../shared/config/messageModel';
import { icons } from '../../shared/config/Icons';
// const RawMessage = `🤖Tribo Blaze 2.0 - Beta ON!
// Entrada: $icon

// - - - ATÉ GALE 2 - - -

// ⏰ HORÁRIO: $date

// 🧮SINAL DOUBLE🧮`

interface IdPredictOne {
    message: string,
    dateSend: string,
    colorSend: string
}

export class bot {

    static async sendPredict(predictId: number, tilesRaw: HistoryTilesRaw[]): Promise<IdPredictOne> {
        let icon = "-"; let color = "-";
        if (predictId === 1) {
            const PredictResult = await PredictTiles.PredictIcon({ black: icons.black, red: icons.red, white: icons.white }, tilesRaw);
            icon = PredictResult.Icon;
            color = PredictResult.Color;
        }

        let date = new Date();
        let dateNow = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes()}`;

        if (icon == "-" || !icon || color == "-" || !color) {
            throw 'Dont should get Icon or color';
        }

        let message = RawMessage.replace('$icon', icon);
        message = message.replace('$date', dateNow);

        return {
            message: message,
            dateSend: dateNow,
            colorSend: color
        };
    }
}