import {
    Router, Request, Response
} from "express";

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerSetting from '../../config/swaggerSettings.json';
const routes = Router();

const swaggerDefinition = swaggerSetting;

const options = {
    swaggerDefinition,

    apis: ['src/infra/http/routes/*.routes.ts'],
}

const swaggerSpec = swaggerJSDoc(options);

routes.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default routes;