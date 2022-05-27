import { Router } from 'express';

const routes = Router();

import KitblazeController from '../../../modules/Tiles/useCases/kitblaze/kitblazeController';

const kitblazeController = new KitblazeController();

routes.get('/', kitblazeController.execute);
routes.get('/tile', kitblazeController.executeTile);

routes.get("/", (req, res) => {
    res.send({
        message: "predict work",
        routes: {
            "/": "kitblaze scraper"
        }
    })
});

export default routes;