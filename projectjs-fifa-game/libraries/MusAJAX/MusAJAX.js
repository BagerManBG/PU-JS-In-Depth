/**
 * Class MusAJAX. Used for sending AJAX request to retrieve data from the API.
 * AJAX calls are stored in custom cache solution to speed up data loading.
 */
class MusAJAX {
  /**
   * MusAJAX constructor.
   */
  constructor () {
    this.xhr = new XMLHttpRequest();
    this.cache = {};
  }

  /**
   * Empties the cache for requests data.
   */
  clearCache () {
    this.cache = {};
  }

  /**
   * @param url
   * @param callback
   *
   * Executes a get request and then calls a callback when load is ready.
   */
  get (url, callback) {
    if (this.cache.hasOwnProperty(url)) {
      callback.call(this, this.cache[url].data);
    }
    else {
      const onload = () => {
        const data = JSON.parse(this.xhr.response);
        this.cache[url] = {
          timestamp: Date.now(),
          data: data,
        };

        callback.call(this, data)
      };

      this.xhr.open('GET', url);
      this.xhr.onload = onload;
      this.xhr.send();
    }
  }
}
