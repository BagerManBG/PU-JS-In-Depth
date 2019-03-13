class MusAJAX {
  constructor () {
    this.xhr = new XMLHttpRequest();
    this.cache = {};
  }

  clearCache () {
    this.cache = {};
  }

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
