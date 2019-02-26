/**
 * Handles all RNG in the game. Responsible for dice throws and so on.
 *
 * note: "die" = singular of "dice".
 */
globals.rngManager = {
  /**
   * Constant value of a die.
   */
  dieSides: 6,

  /**
   * Number of dice throws to use when doing rng for game.
   */
  rngDiceCount: 3,

  /**
   * @param n
   *
   * @return {number}
   *
   * Roll "n" number of dice and returns the sum.
   */
  roll: function (n = 1) {
    let sum = 0;

    for (let i = 0; i < n; i++) {
      sum += Math.floor(Math.random() * this.dieSides + 1);
    }

    return sum;
  },

  /**
   * @param unit
   * @param damage
   *
   * @return {number}
   *
   * Decides weather this attack is a dodge and recalculates damage.
   */
  dodge: function (unit, damage) {
    const roll = this.roll(this.rngDiceCount);

    if (roll === unit.health) {
      damage = 0;
    }
    else if (roll === this.rngDiceCount) {
      damage = Math.round(damage / 2);
    }

    return damage;
  },
};