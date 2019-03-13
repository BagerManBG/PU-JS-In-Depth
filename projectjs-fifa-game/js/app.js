window.onload = () => {
  globals.MusAJAX.clearCache();

  globals.elements.title = selectDOM('#title');
  globals.elements.content = selectDOM('#content');

  globals.Router.setDefaultRoute('/matches');
  globals.Router.match();
};

window.onhashchange = () => {
  globals.Router.match();
};
