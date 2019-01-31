/**
 * class Event.
 *
 * This class is used to model the creations of Event objects.
 * Event objects are stored in a global list.
 */
class Event {
  /**
   * @param eventData
   *
   * Creates an event object. Name field is required.
   * Format for the date fields MUST be (YYYY-MM-DD).
   */
  constructor(eventData) {
    if (!globals.allowAdditions) {
      console.error('Additions are forbidden at the moment!');
      this.error = true;
    }
    else if (!eventData.name) {
      console.error('Name is a required attribute!');
      this.error = true;
    }
    else if (eventData.date && !globals.regEx.date.test(eventData.date)) {
      console.error('Date is not in a proper format (YYYY-MM-DD)!');
      this.error = true;
    }
    else {
      this.id = globals.idCounter.event ? ++globals.idCounter.event : globals.idCounter.event = 1;
      this.name = String(eventData.name);
      this.date = eventData.date || null;
      this.requireLawfulAge = Boolean(eventData.requireLawfulAge || false);
      this.customers = [];
      this.price = isNaN(Number(eventData.price)) || Number(eventData.price) < 0 ? 0 : Number(eventData.price);
      this.isClosed = false;
      this.VIPs = 0;
      this.rating = 0;
      this.ratings = [];

      globals.eventsList[this.id] = this;
      console.log(`Event #${this.id} was created`);
    }
  }

  /**
   * @return {string}
   *
   * Selects the name of the event, while adding a prefix, which consists of
   * different symbols, added on conditions.
   */
  getName() {
    let prefix = '';

    if (this.price > 0) {
      prefix += '$ ';
    }
    else {
      prefix += '! ';
    }

    if (this.isClosed) {
      prefix += '~ ';
    }

    return prefix + this.name;
  }

  /**
   * @return {string}
   *
   * Returns the rating of the event. If the event is not yes rated, the method
   * will return a proper message. If the event has rating, it will return it in a
   * 0 to 6 format (* / 6).
   */
  getRating() {
    if (this.rating === 0) {
      return 'Not Rated Yet!';
    }
    return this.rating + ' / 6';
  }

  /**
   * @return {Event}
   *
   * Updates the rating of the event using a formula to convert from "1 - 10" score
   * to a "0 - 6" score
   */
  updateRating() {
    const ratings = this.ratings.filter(a => a > 0);
    const ratingsTotal = ratings.reduce((a, b) => a + b, 0);
    const ratingsLength = ratings.length;

    const result = (ratingsTotal / ratingsLength) * 0.6;
    this.rating = Math.round((result + 0.00001) * 100) / 100;
    return this;
  }

  /**
   * @return {Event}
   *
   * Reports the money this event has earned. VIP clients are not included in this
   * report, because they did not pay for their addition to the event.
   */
  earningsReport() {
    if (!this.isClosed) {
      console.error('You can receive a report only from archived events!');
    }
    else if (this.customers.length === 0) {
      console.log(`This event (#${this.id}) did not have any customers!`);
    }
    else if (this.price === 0) {
      console.log(`This event (#${this.id}) was free!`);
    }
    else {
      const total = this.price * (this.customers.length - this.VIPs);
      console.log(`This event (#${this.id}) earned ${globals.functions.formatPrice(total)}, ${this.VIPs}VIPs!`);
    }
    return this;
  }

  /**
   * @param eventData
   * @return {Event | boolean}
   *
   * Updates the event object with the provided data if the rules of the
   * class allow it.
   */
  updateEvent(eventData) {
    if (this.isClosed) {
      console.error('Archived events cannot be altered');
    }
    if (eventData.date && !globals.regEx.date.test(eventData.date)) {
      console.error('Date is not in a proper format (YYYY-MM-DD)!');
    }
    else if (eventData.requireLawfulAge) {
      for (const customer of this.customers) {
        if (customer.age < globals.lawfulAge) {
          console.error('This event has customers that are under lawful age and cannot be updated!');
          return false;
        }
      }
    }
    else {
      this.name = eventData.name || this.name;
      this.date = eventData.date || this.date;
      this.requireLawfulAge = eventData.requireLawfulAge || this.requireLawfulAge;
      console.log(`Event #${this.id} was updated!`);
      return this;
    }
  }

  /**
   * Deletes the current event.
   */
  deleteEvent() {
    this.customers.map(customer => {
      customer.eventsCount--;
      return customer;
    });
    delete globals.eventsList[this.id];
    console.log(`Event (#${this.id}) Deleted!`);
  }

  /**
   * @return {Event}
   *
   * Archives the current event, which means that edit and joining is no more
   * available for this event. The event is considered finished.
   */
  archiveEvent() {
    if (this.isClosed) {
      console.error('This event has already been archived');
    }
    else {
      this.isClosed = true;
      for (const customer of this.customers) {
        if (customer) {
          this.ratings[customer.id] = 0;
        }
      }
    }
    return this;
  }

  /**
   * @param customerData
   * @returns {Customer | boolean}
   *
   * Creates and adds a customer to this event's list with customers using the
   * given data. If the parameter is a Number, then the method searches for an
   * existing customer and if it finds him, it adds him to the event.
   */
  addCustomer(customerData) {
    let customer = {};

    if (Number.isInteger(customerData)) {
      customer = EventController.findCustomer(customerData);
    }
    else {
      customer = new Customer(customerData);
    }

    if (this.isClosed) {
      console.error('This event is archived and customers can no longer be added!');
    }
    else if (!(customer instanceof Customer)) {
      console.error('You can add only objects of type Customer to this list!');
    }
    else {
      if (this.customers[customer.id]) {
        console.error('This customer has already been added to this event!');
      }
      if (this.requireLawfulAge && customer.age < globals.lawfulAge) {
        console.error('This person is too young to be added to this event!');
      }
      else if (!customer.isVIP && customer.wallet - this.price < 0) {
        console.error('This person doesn\'t have enough funds to join this event!');
      }
      else if (!customer.error) {

        if (!customer.isVIP) {
          customer.wallet -= this.price;
        }
        else {
          this.VIPs++;
        }

        customer.isVIP = (++customer.eventsCount % 5 === 0);

        this.customers[customer.id] = customer;
        globals.customersList[customer.id] = customer;
        console.log(`Customer #${customer.id} added to event #${this.id}!`);
        return customer;
      }
    }
    return false;
  }

  /**
   * @param id
   * @returns (Event)
   *
   * Removes a customer from the event, without deleting the customer
   * from every event, only for this one.
   */
  removeCustomer(id) {
    if (!isNaN(Number(id)) && this.customers[id]) {
      delete this.customers[id];
      console.log(`Removed Customer (#${id}) from Event (#${this.id})!`);
    }
    else {
      console.error('Wrong or bad id!');
    }
    return this;
  }

  /**
   * @param sexFilter
   * @return {Event}
   *
   * Lists all customers for the current event. Method has the option to filter only
   * Male or Female customers.
   */
  listCustomers(sexFilter) {
    if (this.customers.length > 0) {
      let customers = this.customers;

      if (sexFilter !== null && (sexFilter === 0 || sexFilter === 1)) {
        customers = customers.filter(c => c.sex === sexFilter);
      }

      if (customers.length > 0) {
        for (const customer of customers) {
          console.log(`Customer (#${customer.id}) Name: ${customer.name}, Age: ${customer.age}, Sex: ${customer.sexVerbose}`);
        }
      }
      else {
        console.log('Search yielded no results!!');
      }
    }
    else {
      console.log('This event has no customers yet!');
    }
    return this;
  }
}
