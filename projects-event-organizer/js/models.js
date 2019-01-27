/**
 * class EventListCollection
 */
class EventListCollection {
  constructor() {
    this.id = globals.idCounter.eventListCollection ? ++globals.idCounter.eventListCollection : globals.idCounter.eventListCollection = 1;
    this.eventLists = [];
    console.log(`EventListCollection #${this.id} was created`);
  }

  findEventIndexDataById(id) {
    for (const listIndex in this.eventLists) {
      for (const eventIndex in this.eventLists[listIndex].events) {
        if (this.eventLists[listIndex].events[eventIndex].id === id) {
          return {
            listIndex: listIndex,
            eventIndex: eventIndex,
          };
        }
      }
    }
    console.error(`An event with the id #${id} was not found!`);
    return false;
  }

  findCustomerIndexDataById(id) {
    for (const listIndex in this.eventLists) {
      for (const eventIndex in this.eventLists[listIndex].events) {
        for (const customerIndex in this.eventLists[listIndex].events[eventIndex].customers) {
          if (this.eventLists[listIndex].events[eventIndex].customers[customerIndex].id === id) {
            return {
              listIndex: listIndex,
              eventIndex: eventIndex,
              customerIndex: customerIndex,
            };
          }
        }
      }
    }
    console.error(`A customer with the id #${id} was not found!`);
    return false;
  }

  addEvent(listId, event) {
    for (const listIndex in this.eventLists) {
      if (this.eventLists[listIndex].id === listId) {
        this.eventLists[listIndex].addEvent(event);
        return undefined;
      }
    }
  }

  updateEvent(id, eventName, requireLawfulAge) {
    const indexData = this.findEventIndexDataById(id);
    if (indexData) {
      this.eventLists[indexData.listIndex].events[indexData.eventIndex].updateEvent(eventName, requireLawfulAge);
    }
  }

  deleteEvent(id) {
    const indexData = this.findEventIndexDataById(id);
    if (indexData) {
      this.eventLists[indexData.listIndex].events.splice(indexData.eventIndex, 1);
      console.log(`Removed Event #${id}!`);
    }
  }

  addCustomer(eventId, customer) {
    const indexData = this.findEventIndexDataById(eventId);
    if (indexData) {
      this.eventLists[indexData.listIndex].events[indexData.eventIndex].addCustomer(customer);
    }
  }

  deleteCustomer(id) {
    const indexData = this.findCustomerIndexDataById(id);
    if (indexData) {
      this.eventLists[indexData.listIndex].events[indexData.eventIndex].customers.splice(indexData.customerIndex, 1);
      console.log(`Removed Customer #${id}!`);
    }
  }

  listCustomers(eventId, sexFilter = null) {
    const indexData = this.findEventIndexDataById(eventId);
    if (indexData) {

      let customers = this.eventLists[indexData.listIndex].events[indexData.eventIndex].customers;
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
      for (const event of list.events) {
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
      for (const event of list.events) {
        if (!event.requireLawfulAge) {
          events.push(event);
        }
      }
    }
    console.log(events);
  }

  listEventsGroupByRequireLawfulAge() {
    for (const list of this.eventLists) {
      for (const event of list.events) {
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

  filterEvents(criteria, value) {
    if (criteria !== 'name' && criteria !== 'requireLawfulAge') {
      console.error('Bad criteria (choose "name" or "requireLawfulAge")!');
      return undefined;
    }

    const events = [];
    console.log(`Searching for "${value}" in "${criteria}"`);

    for (const list of this.eventLists) {
      for (const event of list.events) {
        if (event[criteria] === value) {
          events.push(event);
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
      this.events.push(event);
    }
  }
}

class Event {
  constructor(eventName, eventDate = null, requireLawfulAge = false) {
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
      else if (!customer.error) {
        this.customers.push(customer);
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

class Customer {
  constructor(fullName, sex, age) {
    if (!globals.allowAdditions) {
      console.error('Additions are forbidden at the moment!');
      this.error = true;
    }
    else if (!fullName || !sex == null || !age) {
      console.error('Name, sex and age are required attributes!');
      this.error = true;
    }
    else {
      this.id = globals.idCounter.customer ? ++globals.idCounter.customer : globals.idCounter.customer = 1;
      this.fullName = fullName;
      this.sex = sex;
      this.sexVerbose = Boolean(sex) ? 'Female' : 'Male';
      this.age = age;
      console.log(`Customer #${this.id} was created`);
    }
  }
}
