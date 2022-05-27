import { Response, Request } from 'express';
import BotController from '../../../BotService';

class BotChannelController {
  public async sendMessage(
    request: Request,
    response: Response): Promise<any> {

    const { message, TOKEN, chatId } = request.body;

    if (TOKEN == "ID_TOKEN_BOT_TRIBO_1" && chatId == "ID_CHAT_BOT_TRIBO_1") {
      const sendedMessage = await BotController.sendMessage(message, "5264066036:AAE2ig6Pd0EleCvKCoJokA7NvrG6aFSWb5k", "-1001579922039");
      console.log(sendedMessage);
      return response.json(sendedMessage);
    }

    const sendedMessage = await BotController.sendMessage(message, TOKEN, chatId,);

    return response.json(sendedMessage);

  }

  public async sendTile(
    request: Request,
    response: Response): Promise<any> {

    const IdPredict = request.body?.IdPredict;
    const { TOKEN, chatId } = request.body;

    if (IdPredict) {
      const sendedTile = await BotController.sendPredictOne(TOKEN, chatId, IdPredict);

      return response.json(sendedTile);
    }
    /**
     * @Colgate13x
     * 
     * Precisamos arrumar!!!
     */
    // const sendedTile = await BotController.sendPredictOne(TOKEN, chatId);

    // return response.json(sendedTile);
  }
}

export default BotChannelController;