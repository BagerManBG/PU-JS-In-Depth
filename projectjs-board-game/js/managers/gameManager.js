globals.gameManager = {
  loadSettings: function () {
    const boardSettings = globals.loadJSON('./config/board.json');
    const gameSettings = globals.loadJSON('./config/game.json');
    const statsSettings = globals.loadJSON('./config/stats.json');

    globals.settings = {
      board: boardSettings,
      game: gameSettings,
      stats: statsSettings,
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

  updateTurnMessage: function () {
    selectDOM('.player-turn--player')
      .css('color', globals.playerTurn.color)
      .text(globals.playerTurn.name);
  },

  changeTurn: function () {
    globals.playerTurn = globals.playerTurn.id === globals.players.playerOne.id ? globals.players.playerTwo : globals.players.playerOne;
    this.updateTurnMessage();
  },
};