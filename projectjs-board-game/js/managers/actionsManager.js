globals.actionManager = {

  init: function () {
    this.actionElements = {
      units: {
        knight: document.getElementById('knight-img'),
        elf: document.getElementById('elf-img'),
        dwarf: document.getElementById('dwarf-img'),
      },
      actions: {
        attack: document.getElementById('attack-img'),
        move: document.getElementById('move-img'),
        heal: document.getElementById('heal-img'),
      },
    };

    for (const index in this.actionElements.units) {
      this.actionElements.units[index].addEventListener('click', function () {
        const conditionOne = globals.actionManager.selectedTile;
        const conditionTwo = globals.actionManager.selectionType === 'empty';
        const conditionThree = globals.playerTurn.availableUnits[index] > 0;

        if (conditionOne && conditionTwo && conditionThree) {
          globals.actionManager.selectedTile.spawn(globals.capitalizeFirstLetter(index));

          globals.actionManager.selectedTile.selectionColor = null;
          globals.actionManager.selectedTile = null;
          globals.actionManager.selectionType = null;

          for (const index in globals.actionManager.actionElements.units) {
            globals.actionManager.actionElements.units[index].classList.add('inactive');
          }
          for (const index in globals.actionManager.actionElements.actions) {
            globals.actionManager.actionElements.actions[index].classList.add('inactive');
          }

          globals.board.clearTileSelections();
          globals.canvasManager.drawSelections();

          globals.gameManager.changeTurn();
        }
      });
    }
  },

  removeSelection: function () {
    this.selectedTile.selectionColor = null;
    this.selectedTile = null;
    this.selectionType = null;

    for (const index in this.actionElements.units) {
      this.actionElements.units[index].classList.add('inactive');
    }
    for (const index in this.actionElements.actions) {
      this.actionElements.actions[index].classList.add('inactive');
    }

    globals.board.clearTileSelections();
    globals.canvasManager.drawSelections();

    return this;
  },

  selectTile: function (tile) {
    if (tile instanceof Tile) {

      if (tile === this.selectedTile) {
        tile.selectionColor = null;
        this.removeSelection();
        return false;
      }

      if (tile.player && !tile.entity && tile.player === globals.playerTurn) {
        globals.board.clearTileSelections();
        this.selectedTile = tile;
        this.selectionType = 'empty';

        for (const index in this.actionElements.units) {
          if (globals.playerTurn.availableUnits[index] > 0) {
            this.actionElements.units[index].classList.remove('inactive');
          }
        }
        for (const index in this.actionElements.actions) {
          this.actionElements.actions[index].classList.add('inactive');
        }

        tile.selectionColor = globals.settings.game['selectionColors']['current'];
        globals.canvasManager.drawSelections();
      }
      else if (tile.entity && tile.entity instanceof PlayableEntity && tile.entity.player === globals.playerTurn) {
        globals.board.clearTileSelections();
        this.selectedTile = tile;
        this.selectionType = 'unit';

        for (const index in this.actionElements.units) {
          this.actionElements.units[index].classList.add('inactive');
        }
        for (const index in this.actionElements.actions) {
          this.actionElements.actions[index].classList.remove('inactive');
        }

        tile.selectionColor = globals.settings.game['selectionColors']['current'];
        globals.canvasManager.drawSelections();
      }

      return true;
    }
  },
};