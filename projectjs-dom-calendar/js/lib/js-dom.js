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
      const newObj = Object.assign({}, this);
      newObj.elements = [singleElement];
      return newObj;
    }
  }

  length() {
    return this.elements.length;
  }
}

const selectDOM = selector => new jsDOM(selector);