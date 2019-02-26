/**
 * class Elf.
 */
globals.entityClasses.Elf = class Elf extends PlayableEntity {
  /**
   * @param tile
   * @param player
   *
   * Creates an Elf entity.
   */
  constructor (tile, player = tile.player) {
    const image = player === globals.players.playerOne ? globals.assets.elfPlayerOneImage : globals.assets.elfPlayerTwoImage;
    const stats = globals.settings.stats['elf'];

    super(tile, image, stats, player);
  }
};