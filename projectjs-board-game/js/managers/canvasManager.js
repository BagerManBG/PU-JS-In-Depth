/**
 * Manages all the canvasCollection. Responsible for drawing and clearing on the canvasCollection.
 */
globals.canvasManager = {
  /**
   * Loads the canvasCollection that the game uses with all the necessary canvases.
   */
  loadCanvasCollection: function () {
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

    globals.canvasCollection = {
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

  /**
   * @param context
   *
   * Clears the selected canvas, using his context.
   */
  clearCanvas: function (context) {
    if (context) {
      context.clearRect(0, 0, globals.board.width, globals.board.height);
    }
  },

  /**
   * Creates the board and draws the tiles based on configuration. (One time action only)
   */
  initBoard: function () {
    globals.settings.tilesCount = {
      x: globals.settings.board.width,
      y: globals.settings.board.height,
    };

    const boardWidth = globals.canvasCollection.field.element.width;
    const boardHeight = globals.canvasCollection.field.element.height;

    globals.board = new Board(boardWidth, boardHeight, globals.settings.board, globals.canvasCollection.field);

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
          const ctx = globals.canvasCollection.fieldBorders.context;
          ctx.strokeStyle = player.color;
          ctx.lineWidth = 1.25;
          ctx.strokeRect(x, y, width, height);
        }
      }
    }

    selectDOM('.board canvas').on('click', this.initBoardClick);
  },

  /**
   * @param event
   *
   * Handles clicks on the canvas and determines which tile was clicked.
   */
  initBoardClick: function (event) {
    const clientRect = globals.canvasCollection.entities.element.getBoundingClientRect();
    const x = event.clientX - clientRect.left;
    const y = event.clientY - clientRect.top;

    const tile = globals.board.getTile(x, y);
    globals.actionManager.selectTile(tile);
  },

  /**
   * Draws all entities which are in tiles.
   */
  drawEntities: function () {
    const tiles = globals.board.getTilesWithEntity();

    const ctx = globals.canvasCollection.entities.context;
    this.clearCanvas(ctx);

    const offsetX = (globals.settings.board.boxWidth / (globals.settings.tilesCount.x * 2));
    const offsetY = (globals.settings.board.boxHeight / (globals.settings.tilesCount.y * 2));

    for (const tile of tiles) {
      ctx.drawImage(tile.entity.image, tile.coords.x + offsetX, tile.coords.y + offsetY, globals.settings.board.boxWidth - offsetX * 2, globals.settings.board.boxHeight - offsetY * 2);

      if (tile.entity instanceof PlayableEntity) {
        ctx.fillStyle="#ff1243";
        ctx.fillRect(tile.coords.x + offsetX, tile.coords.y - offsetY / 2, (tile.entity.health / tile.entity.getStat('health')) * globals.settings.board.boxWidth - offsetX * 2, 8);
        ctx.strokeRect(tile.coords.x + offsetX, tile.coords.y - offsetY / 2, globals.settings.board.boxWidth - offsetX * 2, 8);
      }
    }
  },

  /**
   * Draws all selections which are in tiles.
   */
  drawSelections: function () {
    const tiles = globals.board.getTilesWithSelection();

    const ctx = globals.canvasCollection.selections.context;
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
