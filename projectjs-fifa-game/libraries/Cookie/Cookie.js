/**
 * Class Cookie. Used for managing cookies.
 */
class Cookie {
  /**
   * @param key
   * @return {array}
   *
   * Gets a cookie by key.
   */
  getCookie (key) {
    const match = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return match ? match[2] : null;
  }

  /**
   * @param key
   * @param value
   * @param days
   *
   * Sets a cookie by key, value and days after which to expire.
   */
  setCookie (key, value, days = 30) {
    const date = new Date;
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = key + "=" + value + ";path=/;expires=" + date.toUTCString();
  }

  /**
   * @param key
   *
   * Deletes a cookie by key. Refreshes history and reloads page.
   */
  deleteCookie (key) {
    this.setCookie(key, '', -1);
    globals.history = [];
    globals.Router.match();
  }
}