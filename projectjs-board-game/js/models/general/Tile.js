class Tile {
  constructor (x, y, player = null, entity = null) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.entity = entity;
  }
}