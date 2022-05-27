interface HistoryTiles {
  number: number;
  color: string;
}

export class TilesClass {
  protected TilesMap = [
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

  constructor(HistoryTiles: HistoryTiles[]) {
    HistoryTiles.map((e: any) => {

      this.TilesHistory.push({
        number: e.number,
        color: this.TilesMap[e.number].color
      });
    });
  }

  get tilesHistory() {
    return this.TilesHistory
  }

  get lastFive() {
    return this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return index < 5 ? tile : null;
    })
  }

  get lastFiveBlack() {
    return this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'black' && index < 5 ? tile : null;
    })
  }

  get lastFiveRed() {
    return this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'red' && index < 5 ? tile : null;
    })
  }

  get countBlack() {
    return this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'black' ? tile : null;
    })
  }

  get countRed() {
    return this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'red' ? tile : null;
    })
  }

  get countWhite() {
    return this.TilesHistory.filter((tile: HistoryTiles, index: number) => {
      return tile.color === 'white' ? tile : null;
    })
  }
}