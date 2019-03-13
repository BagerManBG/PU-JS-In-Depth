class Cookie {
  getCookie (key) {
    const match = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return match ? match[2] : null;
  }

  setCookie (name, value, days = 30) {
    const date = new Date;
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + date.toUTCString();
  }

  deleteCookie (key) {
    this.setCookie(key, '', -1);
    globals.history = [];
    globals.Router.match();
  }
}