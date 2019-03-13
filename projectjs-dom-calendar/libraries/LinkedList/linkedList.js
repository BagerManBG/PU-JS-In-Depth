/**
 * Class LinkedList. Used for simulating a functionality near the one of a linked(circled) list.
 */
class LinkedList {
  /**
   * @param elements
   *
   * LinkedList constructor.
   */
  constructor(elements) {
    this.elements = Array.from(elements);
    this.pointer = 0;
    this.jumped = false;
  }

  /**
   * @return {LinkedList}
   *
   * Clones the current instance of the class.
   */
  clone() {
    return new LinkedList(this.elements.slice()).setPointer(this.pointer);
  }

  /**
   * @param index
   * @return {LinkedList}
   *
   * Changes the pointer (the "iterator").
   */
  setPointer(index) {
    if (index < 0) index = 0;
    if (index === this.getLength()) index = this.getLength() - 1;
    this.pointer = index;

    return this;
  }

  /**
   * @return {number}
   *
   * Returns the number of elements in the instance.
   */
  getLength() {
    return this.elements.length;
  }

  /**
   * @return {number}
   *
   * Gets the index of the pointer.
   */
  getIndex() {
    return this.pointer;
  }

  /**
   * @return {*}
   *
   * Gets the current elements according to the pointer.
   */
  getCurrent() {
    return this.elements[this.pointer];
  }

  /**
   * @return {LinkedList}
   *
   * Moves the pointer to the next element.
   */
  next() {
    this.jumped = (++this.pointer === this.getLength());

    if (this.jumped) {
      this.pointer = 0;
    }
    return this;
  }

  /**
   * @return {LinkedList}
   *
   * Moves the pointer to the previous element.
   */
  prev() {
    this.jumped = (--this.pointer < 0);

    if (this.jumped) {
      this.pointer = this.getLength() - 1;
    }
    return this;
  }

  /**
   * @return {boolean}
   *
   * Returns true if last pointer change was a jump (from last element for first and vice versa).
   */
  didJump() {
    return this.jumped;
  }
}