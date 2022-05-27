import { kitblaze as Kitblaze } from './Service/kitblaze';
import { Response, Request } from 'express';

class kitblazeController {
    public async execute(
        request: Request,
        response: Response): Promise<any> {

        const kitblaze = new Kitblaze();

        const tiles = await kitblaze.scraping();

        return response.json(tiles);
    }

    public async executeTile(
        request: Request,
        response: Response): Promise<any> {

        const kitblaze = new Kitblaze();

        const tiles = await kitblaze.kitblazeTile();

        return response.json(tiles);
    }
}

export default kitblazeController;