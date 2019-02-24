class Player {
  constructor (id, name) {
    this.id = id;
    this.name = name;

    this.alailableTroops = {
      knight: globals.settings.game['troopsPerPlayer']['knight'],
      elf: globals.settings.game['troopsPerPlayer']['elf'],
      dwarf: globals.settings.game['troopsPerPlayer']['dwarf'],
    };
  }
}