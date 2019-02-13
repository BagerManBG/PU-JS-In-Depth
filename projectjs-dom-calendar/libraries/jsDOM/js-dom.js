/**
 * Library jsDOM for manipulating the DOM elements
 * of a web page.
 */
class jsDOM {
  /**
   * @param selector
   *
   * Creates a jsDOM object by selecting
   * the elements and saving them as an array.
   */
  constructor(selector = null) {
    if (typeof selector === 'string') {
      this.elements = Array.from(document.querySelectorAll(selector));
    }
    else if (typeof selector === 'object' && selector !== null) {
      this.elements = [selector];
    }
    else {
      this.elements = [];
    }
  }

  /**
   * @param selector
   * @returns {jsDOM}
   *
   * Static method, which creates an empty jsDOM
   * object without any elements.
   */
  static create(selector) {
    return new jsDOM(selector);
  }

  /**
   * @param htmlString
   * @returns {Node}
   *
   * Creates a DOM Node Element from given markup.
   */
  static createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  /**
   * @returns {number}
   *
   * Returns the number of elements in
   * the jsDOM object.
   */
  length() {
    return this.elements.length;
  }

  /**
   * @param index
   * @returns {jsDOM}
   *
   * Selects one of the elements of the currently
   * selected ones by an index. Returns a jsDOM
   * object, which has only one element selected.
   */
  get(index) {
    const singleElement = this.elements[index];
    if (singleElement) {
      const target = jsDOM.create();
      target.elements = [singleElement];
      return target;
    }
  }

  /**
   * @returns {Array}
   *
   * Gets the elements of the objects as
   * a copied array.
   */
  toArray() {
    return Array.from(this.elements);
  }

  /**
   * @returns {boolean}
   *
   * Checks if there is only one element in the set.
   */
  checkForSingleElement() {
    const len = this.length();
    if (len === 0) {
      console.error('Set of elements is empty.');
      return false;
    }

    if (this.length() !== 1) {
      console.error('This method can be used only on a single element, please use the method "get" to pick an element.');
      return false;
    }

    return true;
  }

  /**
   * @returns {undefined}
   *
   * Removes all elements in the object
   * and deletes the object itself.
   */
  delete() {
    this.elements.forEach(el => el.parentElement.removeChild(el));
    this.elements = [];
    delete this;
    return undefined;
  }


  /**
   * @param markup
   * @returns {jsDOM}
   *
   * Appends the markup at the beginning of the
   * HTML for the elements.
   */
  prepend(markup) {
    this.elements.forEach(el => {
      const newElem = jsDOM.createElementFromHTML(markup);
      el.insertBefore(newElem, el.firstChild);
    });
    return this;
  }

  /**
   * @param markup
   * @returns {jsDOM}
   *
   * Appends the markup at the end of the
   * HTML for the elements.
   */
  append(markup) {
    this.elements.forEach(el => {
      const newElem = jsDOM.createElementFromHTML(markup);
      el.appendChild(newElem)
    });
    return this;
  }

  /**
   * @param attr
   * @param value
   * @returns {String|jsDOM}
   *
   * Returns the value of an attribute if
   * the value param is empty. Sets the selected
   * attribute to the specified value if value is
   * not empty.
   */
  attr(attr, value = null) {
    if (value === null && this.checkForSingleElement()) {
      return this.elements[0].attributes.getNamedItem(attr).value;
    }
    else {
      this.elements.forEach(el => el.setAttribute(String(attr), String(value)));
      return this;
    }
  }

  /**
   * @param value
   * @returns {jsDOM|String}
   *
   * Return the text of an element if value is
   * empty. Sets the text for the selected elements if
   * value is not empty.
   */
  text(value = null) {
    if (value === null && this.checkForSingleElement()) {
      return this.elements[0].innerText;
    }
    else {
      this.elements.forEach(el => el.innerText = String(value));
      return this;
    }
  }

  /**
   * @param value
   * @returns {jsDOM|String}
   *
   * Return the HTML of an element if value is
   * empty. Sets the HTML for the selected elements if
   * value is not empty.
   */
  html(value = null) {
    if (value === null && this.checkForSingleElement()) {
      return this.elements[0].innerHTML;
    }
    else {
      this.elements.forEach(el => el.innerHTML = String(value));
      return this;
    }
  }

  /**
   * @param props
   * @param value
   * @returns {jsDOM|Boolean}
   *
   * Sets the css for the selected elements.
   * There are two ways to do so. First one is to change only one css rule.
   * In that case the parameters are props for the property and value for the
   * value. The other way is to change multiple rules. To do so, give an object
   * with the correct maps as the only parameter.
   */
  css(props, value = null) {
    const isValid = Boolean(props);
    const isOneStyle = (typeof props === 'string' && typeof value === 'string');
    const isMultipleStyles = (typeof props === 'object');
    const isCorrect = (isValid && (isOneStyle || isMultipleStyles));

    if (!isCorrect) {
      console.error('Invalid arguments!');
      return false;
    }

    if (isOneStyle) {
      this.elements.forEach(el => el.style[props] = String(value));
    }
    else {
      for (const prop in props) {
        if (props.hasOwnProperty(prop)) {
          this.elements.forEach(el => el.style[prop] = String(props[prop]));
        }
      }
    }

    return this;
  }

  /**
   * @returns {jsDOM}
   *
   * Returns the parents of the selected elements.
   */
  parent() {
    const parent = jsDOM.create();
    parent.elements = this.elements.map(el => el.parentElement);
    return parent;
  }

  /**
   * @param position
   * @returns {jsDOM|Boolean}
   *
   * Returns the siblings of the selected elements.
   * No parameter means all siblings. Other options are
   * 'before' and 'after'.
   */
  siblings(position = 'all') {
    if (typeof position === 'string') {

      const elements = this.toArray();
      const children = this.parent().toArray().map(pr => pr.children);
      let state = 'before';

      const searchForSiblings = (stateGoal = null) => {
        const sibling = jsDOM.create();
        for (const childIndex in children) {

          const len = children[childIndex].length;
          for (let i = 0; i < len; i++) {

            const stateCondition = (!stateGoal || stateGoal === state);
            const propertyCondition = (children[childIndex].hasOwnProperty(i));
            const invokerObjCondition = (children[childIndex][i].isSameNode(elements[childIndex]));

            if (stateCondition && propertyCondition && !invokerObjCondition) {
              sibling.elements.push(children[childIndex][i]);
            }
            else if (invokerObjCondition) {
              state = 'after';
            }
          }
        }

        return sibling;
      };

      if (position === 'all') {
        return searchForSiblings();
      }
      else if (position === 'before' || position === 'after') {
        return searchForSiblings(position);
      }
    }

    console.error('Bad position parameter (use "before", "after" or no parameter)!');
    return false;
  }

  /**
   * @returns {jsDOM}
   *
   * Returns the children of a selected element.
   */
  children() {
    if (this.checkForSingleElement()) {
      const children = jsDOM.create();
      children.elements = Array.from(this.elements[0].children).filter((el, i) => !isNaN(Number(i)));
      return children;
    }
  }

  /**
   * @param event
   * @param callback
   * @returns {jsDOM}
   *
   * Binds an event to the selected elements.
   */
  on(event, callback) {
    this.elements.forEach(el => el.addEventListener.call(el, event, callback));
    return this;
  }
}

const selectDOM = selector => new jsDOM(selector);
