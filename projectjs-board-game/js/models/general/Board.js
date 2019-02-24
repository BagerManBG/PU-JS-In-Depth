class Board {
  constructor (width, height, settings, field) {
    this.width = width;
    this.height = height;
    this.settings = settings;
    this.field = field;
    this.tiles = [];
  }

  creteTile (x, y, player, entity) {
    if (!Array.isArray(this.tiles[x])) {
      this.tiles[x] = [];
    }
    this.tiles[x][y] = new Tile(x, y, player, entity);
  }

  updateTile (x, y, player = null, entity = null) {
    if (this.tiles[x][y] instanceof Tile) {
      this.tiles[x][y].player = player;
      this.tiles[x][y].entity = entity;
    }
  }
}