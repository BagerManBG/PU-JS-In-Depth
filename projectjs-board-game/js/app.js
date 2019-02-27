/**
 * This is the initial startup of the game. This file calls the game init
 * when the page has finished loading.
 */
window.onload = () => {
  globals.gameManager.initGame();

  window.onresize = () => {
    globals.canvasManager.redrawBoard();
  };
};