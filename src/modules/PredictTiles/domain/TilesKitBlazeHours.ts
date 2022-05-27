export interface HistoryTilesRaw {
  numeroTile: string;
  horaTile: string;
}

interface HistoryTiles {
  number: number;
  color: string;
  time: string;
}
export class Tiles {

  private TilesMap = [
    { 0: 0, color: "white" },
    { 1: 1, color: "red" },
    { 2: 2, color: "red" },
    { 3: 3, color: "red" },
    { 4: 4, color: "red" },
    { 5: 5, color: "red" },
    { 6: 6, color: "red" },
    { 7: 7, color: "red" },
    { 8: 8, color: "black" },
    { 9: 9, color: "black" },
    { 10: 10, color: "black" },
    { 11: 11, color: "black" },
    { 12: 12, color: "black" },
    { 13: 13, color: "black" },
    { 14: 14, color: "black" }
  ];

  protected TilesHistory: HistoryTiles[] = [];

  constructor(HistoryTiles: HistoryTilesRaw[]) {

    HistoryTiles.map(({
      numeroTile,
      horaTile
    }: HistoryTilesRaw) => {

      let titleNumber = numeroTile ? parseInt(numeroTile) : parseInt('0');

      this.TilesHistory.push({
        number: titleNumber,
        color: this.TilesMap[titleNumber].color,
        time: horaTile
      });
    });

  }

  get tiles() {
    return this.TilesHistory
  }

  public async getThreeByTime(time: string /* time = 22:30 */) {
    const fistTime = time; //"22:30";
    const secTime = time; //"22:30";
    let TimeAux = time.split(':');
    const threeTime = String(parseInt(TimeAux[0]) + ":" + (parseInt(TimeAux[1]) + 1)); //"22:31";

    const tiles = this.TilesHistory.filter(({ time }) => {
      return time === fistTime || time === secTime || time === threeTime;
    });

    // Remover possição 0
    const txt = [];
    txt.push(tiles[1]);
    txt.push(tiles[2]);
    txt.push(tiles[3]);
    return txt;

  }
}