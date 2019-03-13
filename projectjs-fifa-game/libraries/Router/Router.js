class Router {
  constructor () {
    this.routes = {};
    this.currentRoute = null;
    this.defaultRoute = '/home';
    this.searchParams = new URLSearchParams(window.location.search);
  }

  setDefaultRoute (route) {
    this.defaultRoute = String(route);
  }

  changeRoute(route = this.defaultRoute, path = null) {
    if (this.routes.hasOwnProperty(route)) {
      window.history.pushState({}, this.routes[route].title, (path || window.location.pathname) + '#' + this.routes[route].path);
      this.match();
    }
  }

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

  renderNavigation () {
    globals.elements.navigation.html('');

    for (const route_index in this.routes) {
      globals.elements.navigation.append(`
        <li class="nav-item">
          <a class="nav-link ${this.routes[route_index] === this.currentRoute ? 'active' : ''}" href="#${this.routes[route_index].path}">${this.routes[route_index].title}</a>
        </li>
      `);
    }
  }

  render (render) {
    globals.elements.title.text(this.currentRoute.title);
    this.renderNavigation();
    globals.elements.content.html(render.markup);
    if (render.callback && typeof render.callback === 'function') render.callback();
  }

  match () {
    const route = window.location.hash.slice(1);
    if (this.routes.hasOwnProperty(route) && typeof this.routes[route].callback === 'function') {
      this.currentRoute = this.routes[route];
      this.routes[route].callback.call(this, this.getQueryParams());
      return true;
    }

    if (window.location.hash !== this.defaultRoute) this.changeRoute(this.defaultRoute);
    return false;
  }

  getQueryParams () {
    const paramsResult = {};

    for(const key of this.searchParams.keys()) {
      paramsResult[key] = this.searchParams.get(key);
    }

    return paramsResult;
  }

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
