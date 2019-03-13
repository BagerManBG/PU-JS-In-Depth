/**
 * Class Router. Used for navigating between different components (pages).
 */
class Router {
  /**
   * Router constructor.
   */
  constructor () {
    this.routes = {};
    this.currentRoute = null;
    this.defaultRoute = '/home';
    this.searchParams = new URLSearchParams(window.location.search);
  }

  /**
   * @param route
   *
   * Changes the default route path. Default path is used if user enters an invalid path.
   */
  setDefaultRoute (route) {
    this.defaultRoute = String(route);
  }

  /**
   * @param route
   * @param path
   *
   * Changes the page and re-renders the component.
   */
  changeRoute(route = this.defaultRoute, path = null) {
    if (this.routes.hasOwnProperty(route)) {
      window.history.pushState({}, this.routes[route].title, (path || '/') + '#' + this.routes[route].path);
      this.searchParams = new URLSearchParams(window.location.search);
      this.match();
    }
  }

  /**
   * @param route
   * @param title
   * @param callback
   * @param overwrite
   * @return {boolean}
   *
   * Registers a new route. Overwrite needs to be true in order to be able to overwrite an existing route.
   */
  register (route, title, callback, overwrite = false) {
    if (!this.routes.hasOwnProperty(route) || overwrite) {
      this.routes[route] = {
        path: route,
        title: title,
        callback: callback,
      };
      return true;
    }

    console.error('Re-declaring route, set overwrite to true if you are sure you want to change the route!');
    return false;
  }

  /**
   * Renders navigation section on the page.
   */
  renderNavigation () {
    globals.elements.navigation.html('');

    for (const route_index in this.routes) {
      globals.elements.navigation.append(`
        <li class="nav-item">
          <a class="nav-link ${this.routes[route_index] === this.currentRoute ? 'active' : ''}" data-route="${route_index}" href="/">${this.routes[route_index].title}</a>
        </li>
      `);
    }

    selectDOM('a.nav-link').on('click', function (e) {
      e.preventDefault();
      globals.Router.changeRoute(e.target.getAttribute('data-route'));
    });
  }

  /**
   * @param render
   *
   * Renders a page using a render object.
   */
  render (render) {
    globals.elements.title.text(this.currentRoute.title);
    this.renderNavigation();
    globals.elements.content.html(render.markup);
    if (render.callback && typeof render.callback === 'function') render.callback();
  }

  /**
   * @return {boolean}
   *
   * Matches the current route with all stored routes and if it finds a match it visualizes the corresponding page.
   */
  match () {
    const route = window.location.hash.slice(1);
    if (this.routes.hasOwnProperty(route) && typeof this.routes[route].callback === 'function') {
      globals.history.push({
        path: window.location.pathname + window.location.search + window.location.hash,
        date: new Date().toUTCString(),
      });
      globals.Cookie.setCookie(globals.history_cookie_key, JSON.stringify(globals.history));

      this.currentRoute = this.routes[route];
      this.routes[route].callback.call(this, this.getQueryParams());

      return true;
    }

    if (window.location.hash !== this.defaultRoute) this.changeRoute(this.defaultRoute);
    return false;
  }

  /**
   * Gets all the query parameters from the url.
   */
  getQueryParams () {
    const paramsResult = {};

    for(const key of this.searchParams.keys()) {
      paramsResult[key] = this.searchParams.get(key);
    }

    return paramsResult;
  }

  /**
   * @param paramsObj
   *
   * Used to set single or multiple query parameters.
   */
  setQueryParams (paramsObj) {
    for (const key in paramsObj) {
      if (paramsObj[key]) {
        this.searchParams.set(key, paramsObj[key]);
      }
      else {
        this.searchParams.delete(key);
      }
    }

    this.changeRoute(window.location.hash.slice(1), '/?' + this.searchParams.toString());
    return this.getQueryParams();
  }
}
