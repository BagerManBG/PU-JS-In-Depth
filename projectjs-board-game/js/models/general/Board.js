/**
 * class Board.
 */
class Board {
  /**
   * @param width
   * @param height
   * @param settings
   * @param field
   *
   * Creates the board object.
   */
  constructor (width, height, settings, field) {
    this.width = width;
    this.height = height;
    this.settings = settings;
    this.field = field;
    this.tiles = [];
  }

  /**
   * @param indexes
   * @param coords
   * @param player
   * @param entity
   *
   * Creates a Tile object on the board.
   */
  creteTile (indexes, coords, player, entity) {
    if (!Array.isArray(this.tiles[indexes.x])) {
      this.tiles[indexes.x] = [];
    }
    this.tiles[indexes.x][indexes.y] = new Tile(indexes, coords, player, entity);
  }

  /**
   * @param indexes
   * @param coords
   * @param player
   * @param entity
   *
   * Updates a Tile object on the board.
   */
  updateTile (indexes, coords, player = null, entity = null) {
    if (this.tiles[indexes.x][indexes.y] instanceof Tile) {
      this.tiles[indexes.x][indexes.y].player = player;
      this.tiles[indexes.x][indexes.y].entity = entity;
    }
  }

  /**
   * @param x
   * @param y
   *
   * @return {Tile|boolean}
   *
   * Gets a Tile by coordinates x and y.
   */
  getTile (x, y) {
    for (const row of this.tiles) {
      for (const tile of row) {
        if (tile.detectHit(x, y)) {
          return tile;
        }
      }
    }

    return false;
  }

  /**
   * @param x
   * @param y
   *
   * @return {Tile|boolean}
   *
   * Gets a Tile by coordinates x and y of the matrix (board).
   */
  getTileByMatrixCoords (x, y) {
    return this.tiles[x] && this.tiles[x][y] ? this.tiles[x][y] : false;
  }

  /**
   * @param player
   *
   * @returns {Array}
   *
   * Get all tiles by belonging to player. If player is null, the neutral tiles are returned.
   */
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

  /**
   * @return {Array}
   *
   * Gets all tiles, which have a selection.
   */
  getTilesWithSelection () {
    const result = [];

    for (const row of this.tiles) {
      for (const tile of row) {
        if (tile.selectionColor) result.push(tile);
      }
    }

    return result;
  }

  /**
   * @param entity_type
   *
   * @return {Array}
   *
   * Gets all tiles that have a certain entity type entity in them. If entity_type is empty, all tiles with
   * entities in them are returned.
   */
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

  /**
   * Clears selections on all tiles.
   */
  clearTileSelections () {
    for (const row of this.tiles) {
      for (const tile of row) {
        tile.selectionColor = null;
      }
    }
  }

  /**
  * Clears entities on all tiles.
  */
  clearEntities () {
    for (const row of this.tiles) {
      for (const tile of row) {
        tile.entity = null;
      }
    }
  }

  /**
   * @param tile
   * @param n
   * @param endConditionCallback
   * @param res
   *
   * @return [Tile]|boolean
   *
   * Gets all adjacent tiles to a given tile. n specifies how many layers deep is the search.
   */
  getAdjacentTiles (tile, n = 1, endConditionCallback = null, res = []) {
    if (!(tile instanceof Tile)) {
      return false;
    }

    if (typeof endConditionCallback === 'function' && endConditionCallback(tile)) {
      return res;
    }

    const x = tile.indexes.x;
    const y = tile.indexes.y;

    const tiles = [
      this.getTileByMatrixCoords(x + 1, y),
      this.getTileByMatrixCoords(x - 1, y),
      this.getTileByMatrixCoords(x, y + 1),
      this.getTileByMatrixCoords(x, y - 1),
    ];

    res = res.concat(tiles.filter(el => el && res.indexOf(el) < 0));

    if (n - 1 <= 0) {
      return res;
    }
    else {
      for (let i = 0; i < 4; i++) {
        if (tiles[i]) {
          res = res
            .concat(this.getAdjacentTiles(tiles[i], n - 1, endConditionCallback, res)
            .filter(el => el && res.indexOf(el) < 0));
        }
      }
      return res;
    }
  }
}