class Tile {
  constructor (indexes, coords, player = null, entity = null) {
    this.indexes = indexes;
    this.coords = coords;
    this.player = player;
    this.entity = entity;
  }

  detectHit (x, y) {
    const xCondition = (x > this.coords.x && x < this.coords.x + globals.settings.board.boxWidth);
    const yCondition = (y > this.coords.y && y < this.coords.y + globals.settings.board.boxHeight);
    return (xCondition && yCondition);
  }
}