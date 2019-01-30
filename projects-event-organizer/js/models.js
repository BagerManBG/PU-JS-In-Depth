/**
 * class EventListCollection.
 */
class EventListCollection {
  constructor() {
    this.id = globals.idCounter.eventListCollection ? ++globals.idCounter.eventListCollection : globals.idCounter.eventListCollection = 1;
    this.eventLists = [];
    this.filterCriteria = {
      name: 'string',
      requireLawfulAge: 'boolean',
      isClosed: 'boolean',
      all: null,
    };
    console.log(`EventListCollection #${this.id} was created`);
  }

  static findCustomer(id) {
    if (globals.customersList[id]) {
      return globals.customersList[id];
    }
    else {
      console.error(`Cannot find customer with id #${id}!`);
      return false;
    }
  }

  rateEvent(eventId, customerId, rating) {
    const event = this.getEvent(eventId);

    if (!event) {
      console.error('Event with id specified cannot be found!');
    }
    else if (!event.isClosed) {
      console.error('Only archived events can be rated');
    }
    else if (!event.customers[customerId]) {
      console.error('Customer with id specified cannot be found or is not part of this event!');
    }
    else if (event.ratings[customerId] !== 0) {
      console.error('This customer has already rated the event!');
    }
    else if (isNaN(Number(rating))) {
      console.error('Rating must be a number!');
    }
    else if (rating <= 0 || rating > 10) {
      console.error('Rating must be a number from 1 to 10 inclusive.');
    }
    else {
      event.ratings[customerId] = rating;
      event.updateRating();
      console.log(`Customer (#${customerId}) rated Event (#${eventId}) with a ${rating} / 10 score!`);
    }
  }

  getEvent(id) {
    const indexData = this.findEventIndexDataById(id);
    if (indexData) {
      return this.eventLists[indexData.listIndex].events[id];
    }
    return false;
  }

  findEventIndexDataById(id) {
    for (const list of this.eventLists) {
      if (list && list.events[id]) {
        return {
          listIndex: list.id,
        };
      }
    }
    console.error(`An event with the id #${id} was not found!`);
    return false;
  }

  findCustomerIndexDataById(customerId, eventId) {
    for (const list of this.eventLists) {
      if (list && list.events[eventId]) {
        if (list.events[eventId].customers[customerId]) {
          return {
            listIndex: list.id,
          };
        }
      }
    }
    return false;
  }

  getAllEvents() {
    const events = [];
    for (const list of this.eventLists) {
      if (list && list.events.length > 0) {
        for (event of list.events) {
          if (event) {
            events.push(event);
          }
        }
      }
    }
    return events;
  }

  addEvent(listId, event) {
    if (this.eventLists[listId]) {
      this.eventLists[listId].addEvent(event);
    }
    else {
      console.error(`List with id #${listId} does not exist!`);
    }
  }

  updateEvent(id, eventName, eventDate = null, requireLawfulAge = null) {
    const indexData = this.findEventIndexDataById(id);
    if (indexData) {
      this.eventLists[indexData.listIndex].events[id].updateEvent(eventName, eventDate, requireLawfulAge);
    }
  }

  deleteEvent(id) {
    const indexData = this.findEventIndexDataById(id);
    if (indexData) {
      delete this.eventLists[indexData.listIndex].events[id];
      console.log(`Removed Event #${id}!`);
    }
  }

  addCustomer(eventId, customer) {
    const indexData = this.findEventIndexDataById(eventId);
    if (indexData) {
      this.eventLists[indexData.listIndex].events[eventId].addCustomer(customer);
    }
  }

  deleteCustomer(customerId, eventId) {
    const indexData = this.findCustomerIndexDataById(customerId, eventId);
    if (indexData) {
      delete this.eventLists[indexData.listIndex].events[eventId].customers[customerId];
      console.log(`Removed Customer #${customerId} from Event #${eventId}!`);
    }
  }

  listCustomers(eventId, sexFilter = null) {
    const indexData = this.findEventIndexDataById(eventId);
    if (indexData) {
      let customers = this.eventLists[indexData.listIndex].events[eventId].customers;

      if (sexFilter !== null && (sexFilter === 0 || sexFilter === 1)) {
        customers = customers.filter(c => c.sex === sexFilter);
      }

      for (const customer of customers) {
        console.log(`Customer (#${customer.id}) Name: ${customer.fullName}, Age: ${customer.age}, Sex: ${customer.sexVerbose}`);
      }
    }
  }

  findLargestEvent() {
    let largestEvents = [];
    for (const list of this.eventLists) {

      if (list) {
        for (const event of list.events) {

          if (event) {
            if (largestEvents.length === 0) {
              largestEvents.push(event);
            }
            else if (event.customers.length === largestEvents[0].customers.length) {
              largestEvents.push(event);
            }
            else if (event.customers.length > largestEvents[0].customers.length) {
              largestEvents = [event];
            }
          }
        }
      }
    }

    if (largestEvents.length === 0) {
      console.log('No events were queried.');
    }
    else if (largestEvents.length === 1) {
      console.log('Largest Event: ', largestEvents[0]);
    }
    else {
      console.log(`Largest Events (${largestEvents.length}): `, largestEvents);
    }
  }

  findNonRequiringLawfulAgeEvents() {
    const events = [];
    for (const list of this.eventLists) {

      if (list) {
        for (const event of list.events) {

          if (event && !event.requireLawfulAge) {
            events.push(event);
          }
        }
      }
    }
    console.log(events);
  }

  listEventsGroupByRequireLawfulAge() {
    for (const list of this.eventLists) {

      if (list) {
        for (const event of list.events) {

          if (event) {
            let prefix = null;

            if (event.requireLawfulAge) {
              prefix = '*';
            }
            else {
              prefix = '#';
            }
            console.log(`Event (#${event.id}) ${prefix} ${event.name}: ${event.requireLawfulAge ? '18+' : 'All Ages'}`);
          }
        }
      }
    }
  }

  listEventsGroupByPrice() {
    for (const list of this.eventLists) {

      if (list) {
        for (const event of list.events) {

          if (event) {
            let prefix = null;

            if (event.price > 0) {
              prefix = '$';
            }
            else {
              prefix = '!';
            }
            console.log(`Event (#${event.id}) ${prefix} ${event.name}: ${event.price > 0 ? event.price + ' ' + globals.currencyCode : 'Free'}`);
          }
        }
      }
    }
  }

  listEventsGroupByRating() {
    for (const list of this.eventLists) {

      if (list) {
        for (const event of list.events) {

          if (event) {
            console.log(`Event (#${event.id}) ${event.getName()}'s rating: ${event.rating ? event.rating + ' / 6' : 'Not Rated Yet'}!`);
          }
        }
      }
    }
  }

  filterEvents(criteria, value = null) {
    if (criteria in this.filterCriteria) {
      const isCriteriaMetValue = (this.filterCriteria[criteria] === value);
      const isCriteriaMetType = (this.filterCriteria[criteria] === typeof value);

      if (!isCriteriaMetValue && !isCriteriaMetType) {
        console.error('Bad criteria!');
        return undefined;
      }

      const events = [];
      globals.functions.coloredLog(`Searching by "${criteria}"...`, 'blue');

      for (const list of this.eventLists) {

        if (list) {
          for (const event of list.events) {

            if ((event && value === null) || (event && event[criteria] === value)) {
              events.push(event);
            }
          }
        }
      }

      if (events.length === 0) {
        globals.functions.coloredLog('Search yielded no results.', 'red');
      }
      else {
        for (const event of events) {
          console.log(`Event (#${event.id}) ${event.getName()}: ${event.requireLawfulAge ? '18+' : 'All Ages'}`);
        }
      }
    }
  }
}

/**
 * class EventList.
 */
class EventList {
  constructor() {
    this.id = globals.idCounter.eventList ? ++globals.idCounter.eventList : globals.idCounter.eventList = 1;
    this.events = [];
    console.log(`EventList #${this.id} was created`);
  }

  addEvent(event) {
    if (!(event instanceof Event)) {
      console.error('You can add only objects of type Event to this list!');
    }
    else if (!event.error) {
      this.events[event.id] = event;
    }
  }
}

/**
 * class Event.
 */
class Event {
  constructor(eventName, eventDate = null, requireLawfulAge = false, price = 0) {
    if (!globals.allowAdditions) {
      console.error('Additions are forbidden at the moment!');
      this.error = true;
    }
    else if (!eventName) {
      console.error('Name is a required attribute!');
      this.error = true;
    }
    else if (eventDate && !globals.regEx.date.test(eventDate)) {
      console.error('Date is not in a proper format (YYYY-MM-DD)!');
      this.error = true;
    }
    else {
      this.id = globals.idCounter.event ? ++globals.idCounter.event : globals.idCounter.event = 1;
      this.name = String(eventName);
      this.date = eventDate;
      this.requireLawfulAge = Boolean(requireLawfulAge);
      this.customers = [];
      this.price = isNaN(Number(price)) || Number(price) < 0 ? 0 : Number(price);
      this.isClosed = false;
      this.rating = 0;
      this.ratings = [];
      console.log(`Event #${this.id} was created`);
    }
  }

  getName() {
    if (this.isClosed) {
      return '~ ' + this.name;
    }
    return this.name;
  }

  updateRating() {
    const ratings = this.ratings.filter(a => a > 0);
    const ratingsTotal = ratings.reduce((a, b) => a + b, 0);
    const ratingsLength = ratings.length;

    const result = (ratingsTotal / ratingsLength) * 0.6;
    this.rating = Math.round((result + 0.00001) * 100) / 100;
  }

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
      const total = this.price * this.customers.length;
      console.log(`This event (#${this.id}) earned ${globals.functions.formatPrice(total)}!`);
    }
    return this;
  }

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

  addCustomer(customer) {
    if (Number.isInteger(customer)) {
      customer = EventListCollection.findCustomer(customer);
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

        customer.isVIP = (++customer.eventsCount % 5 === 0);

        this.customers[customer.id] = customer;
        console.log(`Customer #${customer.id} added to event #${this.id}!`);
      }
    }
  }

  updateEvent(eventName, eventDate = null, requireLawfulAge = null) {
    if (eventDate && !globals.regEx.date.test(eventDate)) {
      console.error('Date is not in a proper format (YYYY-MM-DD)!');
    }
    else if (requireLawfulAge) {
      for (const customer of this.customers) {
        if (customer.age < globals.lawfulAge) {
          console.error('This event has customers that are under lawful age and cannot be updated!');
          return undefined;
        }
      }
    }
    else {
      this.name = eventName ? String(eventName) : this.name;
      this.date = eventDate ? eventDate : this.date;
      this.requireLawfulAge = requireLawfulAge !== null ? Boolean(requireLawfulAge) : this.requireLawfulAge;
      console.log(`Event #${this.id} was updated!`);
    }
  }
}

/**
 * class Customer.
 */
class Customer {
  constructor(fullName, sex, age, wallet = 0) {
    if (!globals.allowAdditions) {
      console.error('Additions are forbidden at the moment!');
      this.error = true;
    }
    else if (!fullName || !sex == null || !age) {
      console.error('Name, sex and age are required attributes!');
      this.error = true;
    }
    else if (isNaN(Number(age)) || Number(age) <= 0 || isNaN(Number(wallet)) || Number(wallet) < 0) {
      console.error('Age and wallet must be proper numbers and \'> 0\'!');
      this.error = true;
    }
    else {
      this.id = globals.idCounter.customer ? ++globals.idCounter.customer : globals.idCounter.customer = 1;
      this.fullName = fullName;
      this.sex = sex;
      this.sexVerbose = Boolean(sex) ? 'Female' : 'Male';
      this.age = Number(age);
      this.wallet = Number(wallet);
      this.eventsCount = 0;
      this.isVIP = false;

      globals.customersList[this.id] = this;
      console.log(`Customer #${this.id} was created`);
    }
  }
}
