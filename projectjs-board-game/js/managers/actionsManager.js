/**
 *  Manages player enforced actions. (Unit Placement, move, attacks, ...)
 */
globals.actionManager = {
  /**
   * Creates initial logic that actionManager requires in order to work.
   */
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

    this.handleUnitCreation();
    this.handleActionSelection();
  },

  /**
   * @returns {globals.actionManager}
   *
   * Removes the current selection and clears the canvas for selections.
   */
  removeSelection: function () {
    if (this.selectedTile) {
      this.selectedTile.selectionColor = null;
    }
    this.selectedTile = null;
    this.selectionType = null;
    this.selectedAction = null;

    this.disableUnits();
    this.disableActions();

    globals.board.clearTileSelections();
    globals.canvasManager.drawSelections();

    return this;
  },

  /**
   * @param tile
   * @returns {boolean}
   *
   * Selects a tile and decides what to do after. Returns boolean based on operation success or failure.
   */
  selectTile: function (tile) {
    if (tile instanceof Tile) {

      if (tile === this.selectedTile) {
        tile.selectionColor = null;
        this.removeSelection();
        return false;
      }

      if (this.selectedTile && tile.selectionColor) {
        const methodName = 'resolveAction' + globals.capitalizeFirstLetter(this.selectedAction);
        const condition = globals.actionManager.hasOwnProperty(methodName);

        if (condition) {
          globals.actionManager[methodName](tile);
          return true;
        }
      }

      if (this.selectedAction) {
        this.actionElements.actions[this.selectedAction].style.outlineColor = null;
        this.selectedAction = null;
      }

      if (tile.player && !tile.entity && tile.player === globals.playerTurn) {
        globals.board.clearTileSelections();
        this.selectedTile = tile;
        this.selectionType = 'empty';

        this.enableUnits();
        this.disableActions();

        tile.selectionColor = globals.settings.game['selectionColors']['current'];
        globals.canvasManager.drawSelections();
      }
      else if (tile.entity && tile.entity instanceof PlayableEntity && tile.entity.player === globals.playerTurn) {
        globals.board.clearTileSelections();
        this.selectedTile = tile;
        this.selectionType = 'unit';

        this.disableUnits();
        this.enableActions();

        tile.selectionColor = globals.settings.game['selectionColors']['current'];
        globals.canvasManager.drawSelections();
      }

      return true;
    }
  },

  /**
   * Handles unit placement on board.
   */
  handleUnitCreation: function () {
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

          globals.actionManager.disableUnits();
          globals.actionManager.disableActions();

          globals.board.clearTileSelections();
          globals.canvasManager.drawSelections();

          globals.gameManager.changeTurn();
        }
      });
    }
  },

  /**
   * Handles action selection.
   */
  handleActionSelection: function () {
    for (const index in globals.actionManager.actionElements.actions) {
      globals.actionManager.actionElements.actions[index].addEventListener('click', function () {
        const conditionOne = globals.actionManager.selectedTile;
        const conditionTwo = globals.actionManager.selectionType === 'unit';

        const methodName = 'handleAction' + globals.capitalizeFirstLetter(index);
        const conditionThree = globals.actionManager.hasOwnProperty(methodName);

        if (conditionOne && conditionTwo && conditionThree) {
          const color = globals.actionManager.selectedTile.selectionColor;
          globals.board.clearTileSelections();
          globals.actionManager.selectedTile.selectionColor = color;
          globals.canvasManager.drawSelections();

          globals.actionManager.selectedAction = index;
          globals.actionManager.selectAction();
          globals.actionManager[methodName]();
        }
      });
    }
  },

  /**
   * Visually disable unit selection.
   */
  disableUnits: function () {
    for (const index in this.actionElements.units) {
      this.actionElements.units[index].classList.add('inactive');
    }
  },

  /**
   * Visually enable unit selection.
   */
  enableUnits: function () {
    for (const index in this.actionElements.units) {
      if (globals.playerTurn.availableUnits[index] > 0) {
        this.actionElements.units[index].classList.remove('inactive');
      }
    }
  },

  /**
   * Visually disable action selection.
   */
  disableActions: function () {
    for (const index in this.actionElements.actions) {
      this.actionElements.actions[index].classList.add('inactive');
      this.actionElements.actions[index].style.outlineColor = null;
    }
  },

  /**
   * Visually enable action selection.
   */
  enableActions: function () {
    for (const index in this.actionElements.actions) {
      this.actionElements.actions[index].classList.remove('inactive');
    }
  },

  /**
   * Visually separate selected action from others.
   */
  selectAction: function () {
    for (const index in this.actionElements.actions) {
      if (this.selectedAction !== index) {
        this.actionElements.actions[index].style.outlineColor = null;
      }
      else {
        this.actionElements.actions[index].classList.add('selected');
        this.actionElements.actions[index].style.outlineColor = globals.playerTurn.color;
      }
    }
  },

  /**
   * Handles Attack Action.
   */
  handleActionAttack: function () {
    // Some functionality
  },

  /**
   * Handles Move Action.
   */
  handleActionMove: function () {
    const tiles = globals.board.getAdjacentTiles(this.selectedTile, this.selectedTile.entity.getStat('speed'), tile => {
      return tile.entity && globals.actionManager.selectedTile !== tile;
    });

    for (const tile of tiles) {
      if (!tile.entity && !tile.selectionColor) {
        tile.selectionColor = globals.settings.game['selectionColors']['move'];
      }
    }
    globals.canvasManager.drawSelections();
  },

  /**
   * Handles Heal Action.
   */
  handleActionHeal: function () {
    // Some functionality
  },

  /**
   * Resolves Attack Action.
   */
  resolveActionAttack: function () {
    // Some functionality
  },

  /**
   * @param tile
   *
   * Resolves Move Action.
   */
  resolveActionMove: function (tile) {
    if (!tile.entity && this.selectedTile && this.selectedTile.entity) {
      tile.entity = this.selectedTile.entity;
      this.selectedTile.entity = null;
      this.removeSelection();
      globals.canvasManager.drawEntities();
      globals.gameManager.changeTurn();
    }
  },

  /**
   * Resolves Heal Action.
   */
  resolveActionHeal: function () {
    // Some functionality
  },
};