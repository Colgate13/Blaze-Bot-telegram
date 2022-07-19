import PredictTiles from '../PredictTiles/PredictTiles';
import { HistoryTilesRaw } from '../PredictTiles/domain/TilesBlaze';
import { RawMessage } from '../../shared/config/messageModel';
import { icons } from '../../shared/config/Icons';

interface IdPredictOne {
    message: string,
    dateSend: string,
    colorSend: string
}

export class BotPredictsStrategy {

    static async sendPredict(predictId: number, tilesRaw: HistoryTilesRaw[]): Promise<IdPredictOne> {
        let icon, color = "-";

        switch (predictId) {
            case 1:
                const PredictResult = await PredictTiles.PredictIcon({
                    black: icons.black,
                    red: icons.red,
                    white: icons.white
                },
                    tilesRaw);

                icon = PredictResult.Icon;
                color = PredictResult.Color;
                break;

            default:
                icon = "-";
                color = "-";
        }

        let date = new Date();
        let dateNow = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes()}`;

        if (icon == "-" || !icon || color == "-" || !color) {
            throw 'D not should get Icon or color';
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