/**
 * class EventListCollection.
 */
class EventListCollection {
  constructor() {
    this.id = globals.idCounter.eventListCollection ? ++globals.idCounter.eventListCollection : globals.idCounter.eventListCollection = 1;
    this.eventLists = [];
    console.log(`EventListCollection #${this.id} was created`);
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

  static findCustomer(id) {
    if (globals.customersList[id]) {
      return globals.customersList[id];
    }
    else {
      console.error(`Cannot find customer with id #${id}!`);
      return null;
    }
  }

  addCustomer(eventId, customer) {
    const indexData = this.findEventIndexDataById(eventId);
    if (indexData) {
      if (Number.isInteger(customer)) {
        customer = EventListCollection.findCustomer(customer);
      }
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

  filterEvents(criteria, value) {
    if (criteria !== 'name' && criteria !== 'requireLawfulAge') {
      console.error('Bad criteria (choose "name" or "requireLawfulAge")!');
      return undefined;
    }

    const events = [];
    console.log(`Searching for "${value}" in "${criteria}"`);

    for (const list of this.eventLists) {

      if (list) {
        for (const event of list.events) {

          if (event && event[criteria] === value) {
            events.push(event);
          }
        }
      }
    }

    if (events.length === 0) {
      console.log('Search yielded no results.');
    }
    else {
      for (const event of events) {
        console.log(`Event (#${event.id}) ${event.name}: ${event.requireLawfulAge ? '18+' : 'All Ages'}`);
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
      console.log(`Event #${this.id} was created`);
    }
  }

  addCustomer(customer) {
    if (!(customer instanceof Customer)) {
      console.error('You can add only objects of type Customer to this list!');
    }
    else {
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
