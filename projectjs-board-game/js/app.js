window.onload = () => {

  globals.canvasManager.initBoard();

  window.onresize = () => {
    globals.canvasManager.initBoard();
  };

  console.log(globals);
};