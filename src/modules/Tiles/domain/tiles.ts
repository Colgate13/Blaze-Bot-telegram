import { TilesClass } from './TilesClass'

export interface HistoryTilesRaw {
    [key: number]: number
}

interface HistoryTiles {
    number: number;
    color: string;
}
export class Tiles extends TilesClass {

    constructor(HistoryTiles: HistoryTilesRaw[] | HistoryTiles[], isRaw: boolean = true) {

        if (isRaw) {
            const TilesHistory: HistoryTiles[] = [];
            HistoryTiles.map((e: any) => {

                let titleNumber = e ? parseInt(e) : parseInt('0');

                TilesHistory.push({
                    number: titleNumber,
                    color: this.TilesMap[titleNumber].color
                });
            });

            super(TilesHistory);
        } else {
            //super(HistoryTiles);
        }
    }
}