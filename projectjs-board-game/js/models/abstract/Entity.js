class Entity {

  constructor (tile, image) {
    this.tile = tile;
    this.entity_type = this.constructor.name;
    this.image = image;

    if (this.constructor === Entity) {
      throw new Error('Can\'t instantiate abstract class!');
    }
  }
}