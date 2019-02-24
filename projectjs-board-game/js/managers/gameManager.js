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

  createPlayers () {
    globals.players = {};
    globals.players.playerOne = new Player(1, 'Player 1');
    globals.players.playerTwo = new Player(2, 'Player 2');
  },

  initGame() {
    this.loadSettings();
    this.createPlayers();
  }
};