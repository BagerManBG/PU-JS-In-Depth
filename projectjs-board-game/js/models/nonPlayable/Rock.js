/**
 * class Rock.
 */
globals.entityClasses.Rock = class Rock extends Entity {
  /**
   * @param tile
   *
   * Creates a Rock entity.
   */
  constructor (tile) {
    super(tile, globals.assets.rockImage);
  }
};