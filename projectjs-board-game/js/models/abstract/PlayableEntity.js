class PlayableEntity extends Entity {

  constructor (tile, image, stats, player) {
    super(tile, image);
    this.stats = stats;
    this.player = player;

    if (this.constructor === PlayableEntity) {
      throw new Error('Can\'t instantiate abstract class!');
    }

    for (const stat of globals.requiredStats) {
      if (!this.stats.hasOwnProperty(stat)) {
        throw new Error(`Stats object is missing a required stat (${stat})!`);
      }
    }

    this.player.addUnit(this);
  }
}