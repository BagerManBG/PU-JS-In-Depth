globals.canvasManager = {

  loadCanvases: function () {
    const fieldCanvas = document.getElementById('field');
    const selectionsCanvas = document.getElementById('selections');
    const entitiesCanvas = document.getElementById('entities');

    const boardElement = document.getElementById('board');
    const width = boardElement.scrollWidth;
    const height = boardElement.scrollHeight;

    selectDOM('.board')
      .css({
        width: width,
        height: height,
      })
      .children()
      .attr('width', width)
      .attr('height', height);

    globals.canvases = {
      field: {
        element: fieldCanvas,
        context: fieldCanvas.getContext('2d'),
      },
      selections: {
        element: selectionsCanvas,
        context: selectionsCanvas.getContext('2d'),
      },
      entities: {
        element: entitiesCanvas,
        context: entitiesCanvas.getContext('2d'),
      },
    };
  },

  initBoard: function () {
    globals.gameManager.initGame();
    this.loadCanvases();

    globals.settings.tilesCount = {
      x: globals.settings.board.width,
      y: globals.settings.board.height,
    };

    const boardWidth = globals.canvases.field.element.width;
    const boardHeight = globals.canvases.field.element.height;

    globals.board = new Board(boardWidth, boardHeight, globals.settings.board, globals.canvases.field);

    const ctx = globals.board.field.context;
    ctx.clearRect(0, 0, globals.board.width, globals.board.height);

    const boxWidth = globals.board.width / globals.settings.tilesCount.x;
    const boxHeight = globals.board.height / globals.settings.tilesCount.y;

    globals.settings.board.boxWidth = boxWidth;
    globals.settings.board.boxHeight = boxHeight;

    for (let i = 0; i < globals.settings.tilesCount.y; i++) {
      for (let j = 0; j < globals.settings.tilesCount.x; j++) {

        const x = boxWidth * j;
        const y = boxHeight * i;
        const width = boxWidth * (j + 1);
        const height = boxHeight * (i + 1);
        const playerFieldHeight = globals.settings.board['playerFieldHeight'];

        let color = '';
        let player = null;
        if (i >= playerFieldHeight && i < globals.settings.tilesCount.y - playerFieldHeight) {
          color = globals.settings.board['colors']['neutral'];
        }
        else {
          player = i < playerFieldHeight ? globals.players.playerTwo : globals.players.playerOne;
          color = (j + i) % 2 === 0 ? globals.settings.board['colors']['even'] : globals.settings.board['colors']['odd'];
        }

        globals.board.creteTile(j, i, player);

        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.rect(x, y, width, height);
        ctx.stroke();
      }
    }
  },
};
