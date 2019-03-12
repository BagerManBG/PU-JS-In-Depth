class MusAJAX {
  constructor () {
    this.xhr = new XMLHttpRequest();
  }

  get(url, callback) {
    this.xhr.open('GET', url);
    this.xhr.onload = () => {callback.call(this, JSON.parse(this.xhr.response))};
    this.xhr.send();
  }
}