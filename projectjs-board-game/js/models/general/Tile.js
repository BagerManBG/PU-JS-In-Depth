/**
 * class Tile
 */
class Tile {
  /**
   * @param indexes
   * @param coords
   * @param player
   * @param entity
   *
   * Creates a Tile object.
   */
  constructor (indexes, coords, player = null, entity = null) {
    this.indexes = indexes;
    this.coords = coords;
    this.player = player;
    this.entity = entity;
    this.selectionColor = null;
  }

  /**
   * @return {{x: number, y: number}}
   *
   * Gets the coordinates of the center of the Tile.
   */
  getCenter () {
    return {
      x: this.coords.x + (globals.settings.board.boxWidth / 2),
      y: this.coords.y + (globals.settings.board.boxHeight / 2),
    };
  }

  /**
   * @param x
   * @param y
   *
   * @return {boolean}
   *
   * Returns boolean based on weather point (x, y) is inside this Tile.
   */
  detectHit (x, y) {
    const xCondition = (x > this.coords.x && x < this.coords.x + globals.settings.board.boxWidth);
    const yCondition = (y > this.coords.y && y < this.coords.y + globals.settings.board.boxHeight);
    return (xCondition && yCondition);
  }

  /**
   * @param entity_type
   *
   * @return {boolean}
   *
   * Spawns an entity in this tile by given entity_type.
   */
  spawn (entity_type) {
    if (this.entity) {
      console.error('There is already an entity on this tile!');
      return false;
    }
    if (!globals.entityClasses.hasOwnProperty(entity_type)) {
      console.error(`This entity type (${entity_type}) does not exist!`);
      return false;
    }
    const entity = new globals.entityClasses[entity_type](this);

    if (entity instanceof Entity) {
      this.entity = entity;
      globals.canvasManager.drawEntities();
    }
    else {
      console.error(`This unit is not a child of Entity Abstract Class!`);
      return false;
    }
    return true;
  }
}