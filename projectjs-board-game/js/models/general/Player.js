class Player {

  constructor (id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;

    this.availableUnits = {
      knight: globals.settings.game['unitsPerPlayer']['knight'],
      elf: globals.settings.game['unitsPerPlayer']['elf'],
      dwarf: globals.settings.game['unitsPerPlayer']['dwarf'],
    };

    this.units = [];
  }

  addUnit (entity) {
    const type = entity.entity_type.toLowerCase();

    if (this.availableUnits[type] > 0) {
      this.units.push(entity);
      this.availableUnits[type] -= 1;
    }
    else {
      throw Error('Cannot add more units of this type!');
    }
  }
}