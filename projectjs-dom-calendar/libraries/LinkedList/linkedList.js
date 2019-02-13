class LinkedList {
  constructor(elements) {
    this.elements = Array.from(elements);
    this.pointer = 0;
    this.jumped = false;
  }

  clone() {
    return new LinkedList(this.elements.slice()).setPointer(this.pointer);
  }

  setPointer(index) {
    if (index < 0) index = 0;
    if (index === this.getLength()) index = this.getLength() - 1;
    this.pointer = index;

    return this;
  }

  getLength() {
    return this.elements.length;
  }

  getIndex() {
    return this.pointer;
  }

  getCurrent() {
    return this.elements[this.pointer];
  }

  next() {
    this.jumped = (++this.pointer === this.getLength());

    if (this.jumped) {
      this.pointer = 0;
    }
    return this;
  }

  prev() {
    this.jumped = (--this.pointer < 0);

    if (this.jumped) {
      this.pointer = this.getLength() - 1;
    }
    return this;
  }

  didJump() {
    return this.jumped;
  }
}