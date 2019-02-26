class Tile {

  constructor (indexes, coords, player = null, entity = null) {
    this.indexes = indexes;
    this.coords = coords;
    this.player = player;
    this.entity = entity;
    this.selectionColor = null;
  }

  getCenter () {
    return {
      x: this.coords.x + (globals.settings.board.boxWidth / 2),
      y: this.coords.y + (globals.settings.board.boxHeight / 2),
    };
  }

  detectHit (x, y) {
    const xCondition = (x > this.coords.x && x < this.coords.x + globals.settings.board.boxWidth);
    const yCondition = (y > this.coords.y && y < this.coords.y + globals.settings.board.boxHeight);
    return (xCondition && yCondition);
  }

  spawn (entity_type) {
    if (this.entity) {
      console.error('There is already an entity on this tile!');
      return false;
    }
    this.entity = new globals.entityClasses[entity_type](this);
    globals.canvasManager.drawEntities();
    return this;
  }
}