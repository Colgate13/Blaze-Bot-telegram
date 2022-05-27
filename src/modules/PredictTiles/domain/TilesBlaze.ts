export interface HistoryTilesRaw {
  [key: number]: number
}

interface HistoryTiles {
  number: number;
  color: string;
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

    HistoryTiles.map((e: any) => {

      let titleNumber = e ? parseInt(e) : parseInt('0');

      this.TilesHistory.push({
        number: titleNumber,
        color: this.TilesMap[titleNumber].color
      });
    });
  }

  get tilesHistory() {
    return this.TilesHistory
  }

  get lastFive() {

    const last = this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return index < 5 ? tile : null;
    })

    return last;
  }

  get lastFiveBlack() {

    const last = this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'black' && index < 5 ? tile : null;
    })

    return last;
  }

  get lastFiveRed() {

    const last = this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'red' && index < 5 ? tile : null;
    })

    return last;
  }

  get countBlack() {

    const count = this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'black' ? tile : null;
    })
    return count;
  }

  get countRed() {

    const count = this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'red' ? tile : null;
    })
    return count;
  }

  get countWhite() {

    const count = this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'white' ? tile : null;
    })
    return count;
  }

  get predictOne() {
    console.log(this.tilesHistory);
    let blackChange = 0, redChange = 0, whiteChange = 0;

    let blackCount = this.countBlack.length;
    let WhiteCount = this.countWhite.length;
    let redCount = this.countRed.length;
    let recentTilesBlack = this.lastFiveBlack.length;
    let recentTilesRed = this.lastFiveRed.length;

    if (recentTilesRed > recentTilesBlack) {
      blackChange++;
    } else if (recentTilesRed < recentTilesBlack) {
      redChange++;
    } else {
      redChange++;
      blackChange++;
    }

    if (blackCount > redCount) {
      redChange++;
    } else if (blackCount < redCount) {
      blackChange++;
    } else {
      redChange++;
      blackChange++;
    }

    if (blackChange == redChange && blackCount == redCount) {
      whiteChange = 10;
    } else if (blackCount > redCount) {
      redChange++;
    } else if (blackCount < redCount) {
      blackChange++;
    }

    return {
      blackChange,
      redChange,
      whiteChange,
      datas: {
        red: redCount,
        black: blackCount,
        white: WhiteCount,
        recents: {
          red: recentTilesRed,
          black: recentTilesBlack
        }
      }
    }
  }
}