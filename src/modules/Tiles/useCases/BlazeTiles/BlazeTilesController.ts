import { Response, Request } from 'express';
import { Tiles } from '../../domain/tiles';
import { Scraping } from './Service/index';


class HistoryTilesControllers {
    public async execute(
        request: Request,
        response: Response): Promise<any> {
        return response.json(await this.getHistoryTiles());
    }

    public async getHistoryTiles(): Promise<any[]> {
        return (new Tiles(await Scraping.scraping())).tilesHistory;
    }
}

export default HistoryTilesControllers;