import {
    Router, Request, Response
} from "express";
import 'express-async-errors';

import blazeTiles from './BlazeTiles.routes';
import kitblaze from './Kitblaze.routes';

import BotChannel from './BotChannel.routes';

import docs from './docs/index.routes';

export const routesCreator = Router();

const routes = Router();

routes.use("/docs", docs);

routes.use("/tribozord/blazetiles/", blazeTiles);
routes.use("/tribozord/kitblaze/", kitblaze);
routes.use("/botchannel", BotChannel);

routes.use("/", (request: Request, response: Response) => {

    response.send({
        message: "All routes are *ONLINE*",
        routes: [
            {
                path: "/tribozord/blazetiles/",
                message: "BlazeTiles"
            },
            {
                path: "/tribozord/predict/",
                message: "Predict"
            },
            {
                path: "/tribozord/kitblaze/",
                message: "Kitblaze"
            },
            {
                path: "/tribozord/use/",
                message: "Use"

            },
        ]
    });
});
export default routes;