/**
 *  Manager for the game setup and dynamics. Handles game initiations and player operations.
 */
globals.gameManager = {
  /**
   * Loads settings that manager requires.
   */
  loadSettings: function () {
    const boardSettings = globals.loadJSON('./config/board.json');
    const gameSettings = globals.loadJSON('./config/game.json');
    const statsSettings = globals.loadJSON('./config/stats.json');

    Object.assign(globals.settings, {
      board: boardSettings,
      game: gameSettings,
      stats: statsSettings,
    });

    globals.assets = {
      rockImage: document.getElementById('asset--rock'),

      knightPlayerOneImage: document.getElementById('asset--knight--playerOne'),
      elfPlayerOneImage: document.getElementById('asset--elf--playerOne'),
      dwarfPlayerOneImage: document.getElementById('asset--dwarf--playerOne'),

      knightPlayerTwoImage: document.getElementById('asset--knight--playerTwo'),
      elfPlayerTwoImage: document.getElementById('asset--elf--playerTwo'),
      dwarfPlayerTwoImage: document.getElementById('asset--dwarf--playerTwo'),
    };
  },

  /**
   * Creates the two players.
   */
  createPlayers: function () {
    globals.players = {};
    globals.players.playerOne = new Player(1, 'Player 1', globals.settings.game['playerColors']['playerOne']);
    globals.players.playerTwo = new Player(2, 'Player 2', globals.settings.game['playerColors']['playerTwo']);
    globals.playerTurn = globals.players.playerOne;
    this.updateAvailableUnits();
    this.updateTurnMessage();
    this.updatePlayerScores();
  },

  /**
   * Initialized the game. This method should be called when the page is fully loaded.
   */
  initGame: function () {
    globals.actionManager.init();
    globals.gameManager.loadSettings();
    globals.gameManager.createPlayers();
    globals.canvasManager.loadCanvasCollection();
    globals.canvasManager.initBoard();
    globals.gameManager.initRocks();
  },

  /**
   * Initializes rocks and places them on the board.
   */
  initRocks: function () {
    const rocksMin = globals.settings.game['rocksNumberRange']['min'];
    const rocksMax = globals.settings.game['rocksNumberRange']['max'];

    const rocksCount = Math.floor(Math.random() * rocksMax) + rocksMin;
    globals.settings.game.rocksCount = rocksCount;

    const tiles = globals.board.getTilesByBelonging(null);
    for (let i = 0; i < rocksCount; i++) {
      const randomTileIndex = Math.floor(Math.random() * tiles.length);
      const randomTile = tiles[randomTileIndex];

      randomTile.spawn('Rock');
      tiles.splice(randomTileIndex, 1);
    }
  },

  /**
   * Updated the turn messages on the page with the current player's name.
   */
  updateTurnMessage: function () {
    selectDOM('.player-turn--player')
      .css('color', globals.playerTurn.color)
      .text(globals.playerTurn.name);
  },

  /**
   * Updates the available units left indication on the menu.
   */
  updateAvailableUnits: function () {
    for (const unit in globals.playerTurn.availableUnits) {
      selectDOM('.units-left--count--' + unit).text(globals.playerTurn.availableUnits[unit]);
    }
  },

  /**
   * Changes the turn.
   */
  changeTurn: function () {
    globals.playerTurn = globals.playerTurn.id === globals.players.playerOne.id ? globals.players.playerTwo : globals.players.playerOne;
    globals.actionManager.removeSelection();
    globals.healedThisRound = false;
    selectDOM('.rounds--value').text(++globals.roundCount);
    this.updateTurnMessage();
    this.updateAvailableUnits();
  },

  /**
   * @param entity
   *
   * Visualises entity data on menu.
   */
  displayEntityInfo: function (entity) {
    const name = entity.constructor.name;
    const hp = entity.getCurrentHealth();
    const maxhp = entity.getStat('health');
    const attack = entity.getStat('attack');
    const armor = entity.getStat('armor');

    selectDOM('.unit-info').css('display', 'block');
    selectDOM('.unit-info--title--value').text(name);
    selectDOM('.unit-info--stats--stat.health .unit-info--stats--stat--value').text(hp + '/' + maxhp);
    selectDOM('.unit-info--stats--stat.attack .unit-info--stats--stat--value').text(attack);
    selectDOM('.unit-info--stats--stat.armor .unit-info--stats--stat--value').text(armor);
  },

  /**
   * Hides entity info tab.
   */
  hideEntityInfo: function () {
    selectDOM('.unit-info').css('display', 'none');
    selectDOM('.unit-info--title--value').text('');
    selectDOM('.unit-info--stats--stat.health .unit-info--stats--stat--value').text('');
    selectDOM('.unit-info--stats--stat.attack .unit-info--stats--stat--value').text('');
    selectDOM('.unit-info--stats--stat.armor .unit-info--stats--stat--value').text('');
  },

  /**
   * Updates player scores visually.
   */
  updatePlayerScores: function () {
    selectDOM('.score--player--playerOne').css('color', globals.players.playerOne.color);
    selectDOM('.score--player--playerTwo').css('color', globals.players.playerTwo.color);

    selectDOM('.score--player--playerOne--value').text(globals.players.playerOne.score);
    selectDOM('.score--player--playerTwo--value').text(globals.players.playerTwo.score);
  },

  /**
   * @param tile
   *
   * Deletes entity using it's tile.
   */
  killEntity: function (tile) {
    if (tile instanceof Tile && tile.entity) {
      if (tile.entity.player) {
        tile.entity.player.deadUnits.push(tile.entity);
        tile.entity.player.unitsLeft--;
        globals.removeFromArray(tile.entity.player.units, tile.entity);
      }
      delete tile.entity;
      tile.entity = null;
    }
  },

  /**
   * End game and show winner
   */
  endGame: function (winner) {
    if (winner instanceof Player) {
      selectDOM('.winner--value').css('color', winner.color).text(winner.id);
      selectDOM('#player--1--dead--units').text(globals.players.playerOne.deadUnits.map(u => u.entity_type).join(', '));
      selectDOM('#player--2--dead--units').text(globals.players.playerTwo.deadUnits.map(u => u.entity_type).join(', '));
      selectDOM('.game-finished').css('display', 'block');
    }
  },
};