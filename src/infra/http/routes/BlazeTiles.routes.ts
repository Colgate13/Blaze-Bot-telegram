import { Router } from 'express';
import BlazeTilesController from '../../../modules/Tiles/useCases/BlazeTiles/BlazeTilesController';

const baseURL = 'https://jsonplaceholder.typicode.com/blazetiles/tiles';

/**
 * @swagger
 * components:
 *     BlazeTiles:
 *       allOf:
 *         - type: object
 */

const blazeTilesController = new BlazeTilesController();
const routes = Router();

/**
 * @swagger
 * /tribozord/blazetiles/tiles:
 *   get:
 *     summary: Retrive Blaze now tiles.
 *     description: Retrieve a list of tiles from blaze.com.
 *     responses:
 *       200:
 *         description: A list of tiles.
 *         content:
 *           application/json:'
*/
routes.get('/tiles', blazeTilesController.execute);

routes.get("/", (req, res) => {
    res.send({
        message: "blazeTiles Route",
        routes: {
            "/tiles": "get all history tiles"
        }
    })
});

export default routes;