class Router {
  constructor () {
    this.routes = {};
    this.defaultRoute = 'home';
    this.searchParams = new URLSearchParams(window.location.search);
  }

  setDefaultRoute (route) {
    this.defaultRoute = String(route);
  }

  register (route, callback, overwrite = false) {
    if (!this.routes.hasOwnProperty(route) || overwrite) {
      this.routes[route] = {
        path: route,
        callback: callback,
      };
      return true;
    }

    console.error('Re-declaring route, set overwrite to true if you are sure you want to change the route!');
    return false;
  }

  match () {
    const route = window.location.hash.slice(1);

    if (this.routes.hasOwnProperty(route) && typeof this.routes[route].callback === 'function') {
      this.routes[route].callback.call(this, this.getQueryParams());
      return true;
    }

    window.location.hash = this.defaultRoute;
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

    window.history.pushState({}, '', window.location.pathname + '?' + this.searchParams.toString());
    this.match();
    return this.getQueryParams();
  }
}