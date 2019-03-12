class Router {
  constructor () {
    this.routes = {};
    this.defaultRoute = '';
  }

  setDefaultRoute (route) {
    this.defaultRoute = String(route);
  }

  register (route, callback, overwrite = false) {
    if (!this.routes.hasOwnProperty(route) || overwrite) {
      this.routes[route] = callback;
      return true;
    }

    console.log('Redeclaring route, set overwrite to true if you are sure you want to change the route!');
    return false;
  }

  match () {
    const route = window.location.hash.substr(1);

    if (this.routes.hasOwnProperty(route)) {
      this.routes[route]();
      return true;
    }

    window.location.hash = this.defaultRoute;
    return false;
  }
}