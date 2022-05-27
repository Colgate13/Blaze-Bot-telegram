import * as cheerio from 'cheerio';
import axios from 'axios';
import { Tiles, HistoryTilesRaw } from '../../../domain/tiles';

export interface TileGet {
    horaTile: string;
    numeroTile: string;
}

export class kitblaze {
    public async scraping(url: string = 'https://kitblaze.com/double/?visitante=home'): Promise<any> {
        const res = await axios.get(url);
        const html = await res.data;

        const $ = cheerio.load(html);

        const games = $('#listagem_giros')

        let horariosOftiles = $(games).find('div > div.div-hora').map((i, el) => $(el).text()).get();
        let NumberOftiles = $(games).find('div > span.numero-span').map((i, el) => $(el).text()).get();

        const Tiles: TileGet[] = [];

        let lengthFull = horariosOftiles.length == NumberOftiles.length ? horariosOftiles.length : 10;

        for (let i = 0; i < lengthFull - 1; i++) {
            Tiles.push({ horaTile: horariosOftiles[i], numeroTile: NumberOftiles[i] });
        };

        return Tiles;
    }

    public async kitblazeTile(): Promise<any> {
        const tiles = await this.scraping();
        const tilesArray: HistoryTilesRaw[] = [];

        for (let i = 0; i < tiles.length; i++) {
            tilesArray.push(tiles[i].numeroTile);
        }
        const tile = new Tiles(tilesArray);

        const tilesHistory = tile.tilesHistory;

        const result: any[] = [];
        tilesHistory.map((e: any, index: number) => {
            result.push({
                number: e.number,
                color: e.color,
                time: tiles[index].horaTile
            });
        });

        return result;
    }
}
