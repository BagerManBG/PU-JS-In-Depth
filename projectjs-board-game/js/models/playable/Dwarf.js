globals.entityClasses.Dwarf = class Dwarf extends PlayableEntity {

  constructor (tile, player = tile.player) {
    const image = player === globals.players.playerOne ? globals.assets.dwarfPlayerOneImage : globals.assets.dwarfPlayerTwoImage;
    const stats = globals.settings.stats['dwarf'];

    super(tile, image, stats, player);
  }
}