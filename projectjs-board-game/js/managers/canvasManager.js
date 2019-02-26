globals.canvasManager = {

  loadCanvases: function () {
    const fieldCanvas = document.getElementById('field');
    const fieldBordersCanvas = document.getElementById('field-borders');
    const selectionsCanvas = document.getElementById('selections');
    const entitiesCanvas = document.getElementById('entities');

    const boardElement = document.getElementById('board');
    const width = boardElement.scrollWidth;
    const height = boardElement.scrollHeight;

    selectDOM('.board')
      .css({
        width: width + 'px',
        height: height + 'px',
      })
      .children()
      .attr('width', width)
      .attr('height', height);

    globals.canvases = {
      field: {
        element: fieldCanvas,
        context: fieldCanvas.getContext('2d'),
      },
      fieldBorders: {
        element: fieldBordersCanvas,
        context: fieldBordersCanvas.getContext('2d'),
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

  clearCanvas: function (context) {
    if (context) {
      context.clearRect(0, 0, globals.board.width, globals.board.height);
    }
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
    this.clearCanvas(ctx);

    const boxWidth = globals.board.width / globals.settings.tilesCount.x;
    const boxHeight = globals.board.height / globals.settings.tilesCount.y;
    const playerFieldHeight = globals.settings.board['playerFieldHeight'];

    globals.settings.board.boxWidth = boxWidth;
    globals.settings.board.boxHeight = boxHeight;

    for (let i = 0; i < globals.settings.tilesCount.y; i++) {
      for (let j = 0; j < globals.settings.tilesCount.x; j++) {

        const x = boxWidth * j;
        const y = boxHeight * i;
        const width = boxWidth;
        const height = boxHeight;

        let bgColor = '';
        let player = null;
        if (i >= playerFieldHeight && i < globals.settings.tilesCount.y - playerFieldHeight) {
          bgColor = globals.settings.board['colors']['neutral'];
        }
        else {
          player = i < playerFieldHeight ? globals.players.playerTwo : globals.players.playerOne;
          bgColor = (j + i) % 2 === 0 ? globals.settings.board['colors']['even'] : globals.settings.board['colors']['odd'];
        }

        const tileIndexes = {
          x: j,
          y: i,
        };

        const tileCoords = {
          x: x,
          y: y,
        };

        globals.board.creteTile(tileIndexes, tileCoords, player);

        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, width, height);
        ctx.stroke();

        ctx.rect(x, y, width, height);
        ctx.stroke();

        if (player) {
          const ctx = globals.canvases.fieldBorders.context;
          ctx.strokeStyle = player.color;
          ctx.lineWidth = 1.25;
          ctx.strokeRect(x, y, width, height);
        }
      }
    }

    selectDOM('.board canvas').on('click', this.initBoardClick);
    globals.gameManager.initRocks();
  },

  initBoardClick: function (event) {
    const clientRect = globals.canvases.entities.element.getBoundingClientRect();
    const x = event.clientX - clientRect.left;
    const y = event.clientY - clientRect.top;

    const tile = globals.board.getTile(x, y);
    globals.actionManager.selectTile(tile);
  },

  drawEntities: function () {
    const tiles = globals.board.getTilesWithEntity();

    const ctx = globals.canvases.entities.context;
    this.clearCanvas(ctx);

    const offsetX = (globals.settings.board.boxWidth / (globals.settings.tilesCount.x * 2));
    const offsetY = (globals.settings.board.boxHeight / (globals.settings.tilesCount.y * 2));

    for (const tile of tiles) {
      ctx.drawImage(tile.entity.image, tile.coords.x + offsetX, tile.coords.y + offsetY, globals.settings.board.boxWidth - offsetX * 2, globals.settings.board.boxHeight - offsetY * 2);
    }
  },

  drawSelections: function () {
    const tiles = globals.board.getTilesWithSelection();

    const ctx = globals.canvases.selections.context;
    this.clearCanvas(ctx);

    for (const tile of tiles) {
      const center = tile.getCenter();
      const r = (globals.settings.board.boxWidth / 2) - (globals.settings.board.boxWidth / globals.settings.tilesCount.x);

      ctx.fillStyle = tile.selectionColor;
      ctx.beginPath();
      ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
      ctx.fill();
    }
  },
};
