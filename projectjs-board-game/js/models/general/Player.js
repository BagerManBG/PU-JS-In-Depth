/**
 * class Player.
 */
class Player {
  /**
   * @param id
   * @param name
   * @param color
   *
   * Creates a player object.
   */
  constructor (id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.score = 0;

    this.availableUnits = {
      knight: globals.settings.game['unitsPerPlayer']['knight'],
      elf: globals.settings.game['unitsPerPlayer']['elf'],
      dwarf: globals.settings.game['unitsPerPlayer']['dwarf'],
    };

    this.units = [];
    this.unitsLeft = 0;

    for (const unitType in this.availableUnits) {
      this.unitsLeft += this.availableUnits[unitType];
    }
  }

  /**
   * @param entity
   *
   * Ads a unit to the list of units, belonging to the player.
   */
  addUnit (entity) {
    const type = entity.entity_type.toLowerCase();

    if (this.availableUnits[type] > 0) {
      this.units.push(entity);
      this.availableUnits[type] -= 1;
    }
    else {
      throw Error('Cannot units of this type!');
    }
  }

  /**
   * @param score
   *
   * Update score. Adds the parameter value to the total score. It doesn't replace the value.
   * This is not a setter.
   */
  updateScore (score) {
    this.score += score;

    selectDOM('.score--player--playerOne').css('color', globals.players.playerOne.color);
    selectDOM('.score--player--playerTwo').css('color', globals.players.playerTwo.color);

    selectDOM('.score--player--playerOne--value').text(globals.players.playerOne.score);
    selectDOM('.score--player--playerTwo--value').text(globals.players.playerTwo.score);
  }
}