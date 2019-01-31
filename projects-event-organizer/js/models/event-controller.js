/**
 * class EventController.
 *
 * This class is made to represent a static class, therefore all of it's methods are static.
 */
class EventController {

  /**
   * @param id
   * @returns {Customer | boolean}
   *
   * Searches for Customer object by a given id.
   */
  static findCustomer(id) {
    if (globals.customersList[id]) {
      return globals.customersList[id];
    }
    else {
      console.error(`Cannot find customer with id #${id}!`);
      return false;
    }
  }

  /**
   * @param id
   * @returns {Event | boolean}
   *
   * Searches for Event object by a given id.
   */
  static findEvent(id) {
    if (globals.eventsList[id]) {
      return globals.eventsList[id];
    }
    else {
      console.error(`Cannot find customer with id #${id}!`);
      return false;
    }
  }

  /**
   * @param eventData
   * @returns {Event | boolean}
   *
   * Creates an Event object with given data and if there are no errors, it adds it to the
   * global list of events.
   */
  static addEvent(eventData) {
    const event = new Event(eventData);
    if (!event.error) {
      globals.eventsList[event.id] = event;
      return event;
    }
    return false;
  }

  /**
   * @returns {boolean | Event | Array}
   *
   * Searches for the Event object with the most registered customers. Returns
   * false if no such are found, returns the largest event if it is only one, or returns an
   * array with all the largest events if there are more than one.
   */
  static findLargestEvent() {
    let largestEvents = [];

    for (const event of globals.eventsList) {
      if (event) {

        const customersLength = event.customers.filter(a => a != null).length;
        if (customersLength > 0) {

          if (largestEvents.length === 0) {
            largestEvents.push(event);
          }
          else if (customersLength === largestEvents[0].customers.filter(a => a != null).length) {
            largestEvents.push(event);
          }
          else if (customersLength > largestEvents[0].customers.filter(a => a != null).length) {
            largestEvents = [event];
          }
        }
      }
    }

    if (largestEvents.length === 0) {
      console.log('No events were queried.');
      return false;
    }
    else if (largestEvents.length === 1) {
      console.log('Largest Event: ', largestEvents[0]);
      return largestEvents[0];
    }
    else {
      console.log(`Largest Events (${largestEvents.length}): `, largestEvents);
      return largestEvents;
    }
  }

  /**
   * @param by
   * @param value
   * @returns {Array | boolean}
   *
   * Filters events by a key and a value.
   */
  static filterEvents(by, value) {
    const firstEvent = globals.eventsList.find(e => e);
    if (by === 'all' || firstEvent.hasOwnProperty(by)) {
      const events = globals.eventsList.filter(e => by === 'all' || e[by] === value);
      console.log(events);
      return events;
    }
    else {
      console.error('Bad Sort Criteria!');
      return false;
    }
  }

  /**
   * @param by
   * @param criteria
   * @param prefixFirst
   * @param prefixSecond
   *
   * @returns {Object, boolean}
   *
   * Groups events on two groups by a key (by). It uses the result from a callback (criteria)
   * to determine weather an element belongs to the first group, or to the second one.
   * Finally, when displaying the items, it adds prefixes to the according groups.
   */
  static groupEvents(by, criteria, prefixFirst = '', prefixSecond = '') {
    const firstEvent = globals.eventsList.find(e => e);
    if (firstEvent.hasOwnProperty(by)) {
      const firstGroup = [];
      const secondGroup = [];

      for (const event of globals.eventsList) {
        if (event) {

          if (criteria(event[by])) {
            firstGroup.push(event);
          }
          else {
            secondGroup.push(event);
          }
        }
      }

      console.log(`Grouping by: ${by}`);

      console.log('Group #1:');
      for (const event of firstGroup) {
        console.log(`${prefixFirst} Event (#${event.id}) ${event.getName()}`)
      }

      console.log('Group #2:');
      for (const event of secondGroup) {
        console.log(`${prefixSecond} Event (#${event.id}) ${event.getName()}`)
      }

      return {
        first: firstGroup,
        second: secondGroup,
      }
    }
    else {
      console.error('Bad Group Criteria!');
      return false;
    }
  }
}
