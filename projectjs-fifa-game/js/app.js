/**
 * Initial app.js file. Used for project initialization.
 */
window.onload = () => {
  globals.MusAJAX.clearCache();
  globals.history = JSON.parse(globals.Cookie.getCookie(globals.history_cookie_key) || '[]')

  globals.elements.title = selectDOM('#title');
  globals.elements.navigation = selectDOM('#navigation');
  globals.elements.content = selectDOM('#content');

  globals.Router.setDefaultRoute('/matches');
  globals.Router.match();
};

/**
 * Re-renders page when hash is changed.
 */
window.onhashchange = () => {
  globals.Router.match();
};
