window.onload = () => {
  globals.MusAJAX.clearCache();
  globals.history = JSON.parse(globals.Cookie.getCookie(globals.history_cookie_key) || '[]')

  globals.elements.title = selectDOM('#title');
  globals.elements.navigation = selectDOM('#navigation');
  globals.elements.content = selectDOM('#content');

  globals.Router.setDefaultRoute('/matches');
  globals.Router.match();
};

window.onhashchange = () => {
  globals.Router.match();
};
