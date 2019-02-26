/**
 * PlayableEntity abstract class.
 */
class PlayableEntity extends Entity {
  /**
   * @param tile
   * @param image
   * @param stats
   * @param player
   *
   * @throws Error
   *
   * Creates a PlayableEntity. Throws error if someone tries to create an object out of this class directly,
   * or if a stat is missing in the configuration.
   */
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