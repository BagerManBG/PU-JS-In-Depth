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

    globals.gameManager.hideEntityInfo();

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

      if (this.selectedTile && this.selectedTile.entity instanceof PlayableEntity) {
        globals.gameManager.displayEntityInfo(this.selectedTile.entity);
      }
      else {
        globals.gameManager.hideEntityInfo();
      }

      return true;
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
      const noHealCondition = (
        index === 'heal' &&
        this.selectedTile &&
        this.selectedTile.entity &&
        this.selectedTile.entity.health === this.selectedTile.entity.getStat('health'));
      if (!noHealCondition) {
        this.actionElements.actions[index].classList.remove('inactive');
      }
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

        const noHealCondition = (
          index === 'heal' &&
          globals.actionManager.selectedTile &&
          globals.actionManager.selectedTile.entity &&
          globals.actionManager.selectedTile.entity.health === globals.actionManager.selectedTile.entity.getStat('health')
        );

        if (conditionOne && conditionTwo && conditionThree && !noHealCondition) {
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
   * Handles Attack Action.
   */
  handleActionAttack: function () {
    const isElf = (this.selectedTile.entity.entity_type === 'Elf');
    const tiles = globals.board.getTilesWithEntityInRange(this.selectedTile, this.selectedTile.entity.getStat('range'), isElf, isElf);

    for (const tile of tiles) {
      if (tile.entity && !tile.selectionColor && tile.entity.player !== globals.playerTurn) {
        tile.selectionColor = globals.settings.game['selectionColors']['attack'];
      }
    }
    globals.canvasManager.drawSelections();
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
    if (this.selectedTile && this.selectedTile.entity) {
      this.resolveActionHeal(this.selectedTile.entity);
    }
  },

  /**
   * @param tile
   *
   * Resolves Attack Action.
   */
  resolveActionAttack: function (tile) {
    if (tile.entity && this.selectedTile && this.selectedTile.entity) {
      let player = false;
      if (tile.entity.player) {
        player = tile.entity.player;
      }

      if (tile.entity instanceof Entity && !(tile.entity instanceof PlayableEntity)) {
        globals.gameManager.killEntity(tile);
      }
      else {
        let damage = this.selectedTile.entity.getStat('attack') - tile.entity.getStat('armor');

        if (damage <= 0) {
          damage = 0;
        }
        else {
          damage = globals.rngManager.dodge(tile.entity, damage);
        }

        tile.entity.health -= damage;
        let score = damage;

        if (tile.entity.health <= 0) {
          score += tile.entity.health;
          globals.gameManager.killEntity(tile);
        }

        globals.playerTurn.updateScore(score);
      }

      this.removeSelection();
      globals.canvasManager.drawEntities();

      if (player && player.unitsLeft === 0) {
        globals.gameManager.endGame(globals.playerTurn);
      }
      else {
        globals.gameManager.changeTurn();
      }
    }
  },

  /**
   * @param tile
   *
   * Resolves Move Action.
   */
  resolveActionMove: function (tile) {
    if (!tile.entity && this.selectedTile && this.selectedTile.entity) {
      tile.entity = this.selectedTile.entity;
      this.selectedTile.entity.tile = tile;

      this.selectedTile.entity = null;
      this.removeSelection();

      globals.canvasManager.drawEntities();
      globals.gameManager.changeTurn();
    }
  },

  /**
   * @param entity
   *
   * Resolves Heal Action.
   */
  resolveActionHeal: function (entity) {
    if (entity instanceof PlayableEntity) {
      const heal = globals.rngManager.roll();
      entity.health += heal;

      if (entity.health > entity.getStat('health')) {
        entity.health = entity.getStat('health');
      }

      this.removeSelection();
      globals.canvasManager.drawEntities();

      const roll = globals.rngManager.roll();
      if (roll % 2 === 0 || globals.healedThisRound) {
        globals.gameManager.changeTurn();
      }
      else {
        globals.healedThisRound = true;
      }
    }
  },
};