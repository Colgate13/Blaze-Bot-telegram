import { IIcons } from '../../shared/interface/Icons'
import { Tiles, HistoryTilesRaw } from './domain/TilesBlaze';

export default class PredictTiles {

  static async Predict(tilesRaw: HistoryTilesRaw[]): Promise<any> {
    const tiles = new Tiles(tilesRaw);

    return tiles.predictOne;
  }

  static async PredictIcon({ black, red, white }: IIcons, tilesRaw: HistoryTilesRaw[]): Promise<any> {
    console.log(tilesRaw);
    const tiles = (new Tiles(tilesRaw)).predictOne;
    console.log("tiles ->", tiles);

    let Icon = '';
    let TileColorTip = '';
    if (tiles.blackChange > tiles.redChange && tiles.blackChange > tiles.whiteChange) {
      Icon = `${black} + ${white}`;
      TileColorTip = 'black';
    }
    else if (tiles.redChange > tiles.blackChange && tiles.redChange > tiles.whiteChange) {
      Icon = `${red} + ${white}`;
      TileColorTip = 'red';
    } else if (tiles.whiteChange > tiles.redChange && tiles.whiteChange > tiles.redChange) {
      Icon = `${white}`;
      TileColorTip = 'white';
    } else {
      throw 'Dont should get Icon or TileColorTip';
    }

    return {
      Icon,
      Color: TileColorTip
    };
  }
}
