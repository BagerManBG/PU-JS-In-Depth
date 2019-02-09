/**
 * Library jsDOM for manipulating the DOM elements
 * of a web page.
 */
class jsDOM {
  constructor(selector) {
    this.selector = selector;
    this.elements = document.querySelectorAll(selector);
  }

  get(index) {
    const singleElement = this.elements[index];
    if (singleElement) {
      const newObj = new jsDOM(this.selector);
      newObj.elements = [singleElement];
      return newObj;
    }
  }

  append(markup) {
    this.elements.forEach(el => el.innerHTML += markup);
    return this;
  }

  prepend(markup) {
    this.elements.forEach(el => el.innerHTML = markup + el.innerHTML);
    return this;
  }

  delete() {
    this.elements.forEach(el => el.parentElement.removeChild(el));
    this.elements = [];
    return undefined;
  }

  length() {
    return this.elements.length;
  }
}

Object.prototype.clone = function () {
  if (typeof this !== 'object' || this === null) {
    return this;
  }

  const clonedObj = {};
  const obj = this;

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {

      let value = obj[prop];
      if (value instanceof Object) {
        value = value.clone();
      }

      clonedObj[prop] = value;
    }
  }

  return clonedObj;
};

const selectDOM = selector => new jsDOM(selector);