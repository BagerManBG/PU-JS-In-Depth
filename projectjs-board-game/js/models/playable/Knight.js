/**
 * class Knight.
 */
globals.entityClasses.Knight = class Knight extends PlayableEntity {
  /**
   * @param tile
   * @param player
   *
   * Creates a Knight entity.
   */
  constructor (tile, player = tile.player) {
    const image = player === globals.players.playerOne ? globals.assets.knightPlayerOneImage : globals.assets.knightPlayerTwoImage;
    const stats = globals.settings.stats['knight'];

    super(tile, image, stats, player);
  }
};