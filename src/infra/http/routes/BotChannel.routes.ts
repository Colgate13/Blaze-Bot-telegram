import { Router } from 'express';
import BotChannelController from '../../../modules/BotChannel/infra/http/controllers/BotChannelController';

const botChannelController = new BotChannelController();
const routes = Router();

routes.post('/sendMessage', botChannelController.sendMessage);
routes.post('/sendTile', botChannelController.sendTile);

export default routes;