class Board {
  constructor (width, height, settings, field) {
    this.width = width;
    this.height = height;
    this.settings = settings;
    this.field = field;
    this.tiles = [];
  }

  creteTile (indexes, coords, player, entity) {
    if (!Array.isArray(this.tiles[indexes.x])) {
      this.tiles[indexes.x] = [];
    }
    this.tiles[indexes.x][indexes.y] = new Tile(indexes, coords, player, entity);
  }

  updateTile (indexes, coords, player = null, entity = null) {
    if (this.tiles[indexes.x][indexes.y] instanceof Tile) {
      this.tiles[indexes.x][indexes.y].player = player;
      this.tiles[indexes.x][indexes.y].entity = entity;
    }
  }

  getTile (x, y) {
    for (const row of this.tiles) {
      for (const tile of row) {
        if (tile.detectHit(x, y)) {
          return tile;
        }
      }
    }
  }
}