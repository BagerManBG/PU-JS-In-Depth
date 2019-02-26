globals.gameManager = {
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

  createPlayers: function () {
    globals.players = {};
    globals.players.playerOne = new Player(1, 'Player 1', globals.settings.game['playerColors']['playerOne']);
    globals.players.playerTwo = new Player(2, 'Player 2', globals.settings.game['playerColors']['playerTwo']);
    globals.playerTurn = globals.players.playerOne;
    this.updateTurnMessage();
  },

  initGame: function () {
    this.loadSettings();
    this.createPlayers();
  },

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

  updateTurnMessage: function () {
    selectDOM('.player-turn--player')
      .css('color', globals.playerTurn.color)
      .text(globals.playerTurn.name);
  },

  updateAvailableUnits: function () {
    for (const unit in globals.playerTurn.availableUnits) {
      selectDOM('.units-left--count--' + unit).text(globals.playerTurn.availableUnits[unit]);
    }
  },

  changeTurn: function () {
    globals.playerTurn = globals.playerTurn.id === globals.players.playerOne.id ? globals.players.playerTwo : globals.players.playerOne;
    globals.actionManager.removeSelection();
    this.updateTurnMessage();
    this.updateAvailableUnits();
  },
};