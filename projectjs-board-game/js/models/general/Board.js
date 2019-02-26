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

  getTilesByBelonging (player = null) {
    const result = [];

    for (const row of this.tiles) {
      for (const tile of row) {
        if (tile.player === player) {
          result.push(tile);
        }
      }
    }

    return result;
  }

  getTilesWithSelection () {
    const result = [];

    for (const row of this.tiles) {
      for (const tile of row) {
        if (tile.selectionColor) result.push(tile);
      }
    }

    return result;
  }

  getTilesWithEntity (entity_type = null) {
    const result = [];

    for (const row of this.tiles) {
      for (const tile of row) {
        if (tile.entity) {
          if (entity_type === null) {
            result.push(tile);
          }
          else if (tile.entity.entity_type === entity_type) {
            result.push(tile);
          }
        }
      }
    }

    return result;
  }

  clearTileSelections () {
    for (const row of this.tiles) {
      for (const tile of row) {
        tile.selectionColor = null;
      }
    }
  }
}