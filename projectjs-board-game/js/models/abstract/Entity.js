/**
 * Entity abstract class.
 */
class Entity {
  /**
   * @param tile
   * @param image
   *
   * @throws Error
   *
   * Creates an Entity. Throws error if someone tries to create an object out of this class directly.
   */
  constructor (tile, image) {
    this.tile = tile;
    this.entity_type = this.constructor.name;
    this.image = image;

    if (this.constructor === Entity) {
      throw new Error('Can\'t instantiate abstract class!');
    }
  }
}