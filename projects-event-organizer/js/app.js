/**
 * Task Tests.
 * Nothing in this file offers any functionality,
 * only tests of it.
 */
window.onload = () => {
  const processes = [];

  /**
   *
   * Part 1.
   *
   */

  /**
   * Test for #1.1 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.1   #######', 'green', '\n');
    console.log('Full Data: ', globals.eventListCollection);
  });

  /**
   * Test for #1.2 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.2   #######', 'green', '\n');
    for (const eventList of globals.eventListCollection.eventLists) {

      if (eventList) {
        console.log(`Events for list #${eventList.id}`);
        for (const event of eventList.events) {

          if (event) {
            console.log(`${' '.repeat(4)}Event (#${event.id}) ${event.name}: ${event.requireLawfulAge ? '18+' : 'All Ages'}`);
            for (const customer of event.customers) {

              if (customer) {
                console.log(`${' '.repeat(8)}Customer (#${customer.id}) Name: ${customer.fullName}, Age: ${customer.age}, Sex: ${customer.sexVerbose}`);
              }
            }
          }
        }
      }
    }
  });

  /**
   * Test for #1.3 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.3   #######', 'green', '\n');
    globals.eventListCollection.deleteEvent(60);
    globals.eventListCollection.deleteEvent(5);
    console.log('Full Data: ', globals.eventListCollection);
  });

  /**
   * Test for #1.4 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.4   #######', 'green', '\n');
    globals.eventListCollection.addEvent(2, new Event('I was added later'));
    console.log('Full Data: ', globals.eventListCollection);
  });

  /**
   * Test for #1.5 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.5   #######', 'green', '\n');
    globals.eventListCollection.updateEvent(1, 'I used to be Test 1');
    console.log('Full Data: ', globals.eventListCollection);
  });

  /**
   * Test for #1.6 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.6   #######', 'green', '\n');
    globals.eventListCollection.addCustomer(6, new Customer('Hakuna Matata', 1, 19));
    console.log('Full Data: ', globals.eventListCollection);
  });

  /**
   * Test for #1.7 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.7   #######', 'green', '\n');
    globals.eventListCollection.listCustomers(4, 0);
  });

  /**
   * Test for #1.8 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.8   #######', 'green', '\n');
    globals.eventListCollection.deleteCustomer(1, 1);
    console.log('Full Data: ', globals.eventListCollection);
  });

  /**
   *
   * Part 2.
   *
   */

  /**
   * Test for #2.1 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.1   #######', 'green', '\n');
    globals.functions.updateAdditionState(false);
    globals.eventListCollection.addCustomer(6, new Customer('Hakuna Matata', 1, 19));
    globals.functions.updateAdditionState(true);
  });

  /**
   * Test for #2.2 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.2   #######', 'green', '\n');
    globals.eventListCollection.addEvent(2, new Event('I was added laterer', '2019-03-31'));
    globals.eventListCollection.updateEvent(1, null, '2019-03-31', null);
    console.log('Full Data: ', globals.eventListCollection);
  });

  /**
   * Test for #2.3 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.3   #######', 'green', '\n');
    globals.eventListCollection.findLargestEvent();
  });

  /**
   * Test for #2.4 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.4   #######', 'green', '\n');
    globals.eventListCollection.findNonRequiringLawfulAgeEvents();
  });

  /**
   * Test for #2.5 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.5   #######', 'green', '\n');
    globals.eventListCollection.listEventsGroupByRequireLawfulAge();
  });

  /**
   * Test for #2.6 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.6   #######', 'green', '\n');
    globals.eventListCollection.filterEvents('namennnnnn', 'Test 2');
    globals.eventListCollection.filterEvents('name', 'Test 2');
    globals.eventListCollection.filterEvents('requireLawfulAge', false);
  });

  /**
   *
   * Part 3.
   *
   */

  /**
   * Test for #3.1 task (and #3.2).
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 3.1 (and #3.2)  #######', 'green', '\n');
    globals.eventListCollection.addEvent(2, new Event('Dobi is free', '2019-06-31', false, 0));
    globals.eventListCollection.addEvent(2, new Event('Dobi is freen\'t', '2019-06-31', false, 10));
    console.log('Full Data: ', globals.eventListCollection);
  });

  /**
   * Test for #3.3 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 3.3   #######', 'green', '\n');
    globals.eventListCollection.listEventsGroupByPrice();
  });

  /**
   * Test for #3.4 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 3.4   #######', 'green', '\n');
    globals.eventListCollection.addCustomer(9, 4);
    globals.eventListCollection.addCustomer(8, 1);
    globals.eventListCollection.addCustomer(7, 1);
    globals.eventListCollection.addCustomer(6, 1);
    globals.eventListCollection.addCustomer(4, 1);
    globals.eventListCollection.addCustomer(3, 1);
    globals.eventListCollection.addCustomer(2, 5);
    globals.eventListCollection.addCustomer(1, 5);
    console.log('Full Data: ', globals.eventListCollection);
    console.log(globals.customersList);
  });

  /**
   * Test for #3.5 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 3.5   #######', 'green', '\n');
    globals.eventListCollection.addCustomer(1, 1); // this is customer #1's free event.
    console.log('Full Data: ', globals.eventListCollection);
    console.log(globals.customersList);
  });

  /**
   *
   * Part 4.
   *
   */

  /**
   * Test for #4.1 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.1   #######', 'green', '\n');
    const event = globals.eventListCollection.getEvent(1);
    event
      .archiveEvent()
      .addCustomer(1);
    console.log('Full Data: ', globals.eventListCollection);
  });

  /**
   * Test for #4.2 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.2   #######', 'green', '\n');
    console.log(globals.eventListCollection.getEvent(1).getName());
    console.log(globals.eventListCollection.getEvent(2).getName());
  });

  /**
   * Test for #4.3 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.3   #######', 'green', '\n');
    globals.eventListCollection.filterEvents('all');
    globals.eventListCollection.filterEvents('isClosed', false);
    globals.eventListCollection.filterEvents('isClosed', true);
  });

  /**
   * Test for #4.4 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.4   #######', 'green', '\n');
    const events = globals.eventListCollection.getAllEvents();
    for (event of events) {
      event
        .archiveEvent()
        .earningsReport();
    }
  });

  /**
   * Test for #4.5 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.5   #######', 'green', '\n');
    globals.eventListCollection.rateEvent(6, 1, 2);
    globals.eventListCollection.rateEvent(6, 6, 10);
  });

  /**
   * Test for #4.6 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.6   #######', 'green', '\n');
    globals.eventListCollection.listEventsGroupByRating();
  });

  /**
   * Query though all registered processes and run them
   * using all at once mode or waiting for input mode,
   * depending on the value of the global waitForKeyInputOnTests var.
   *
   * Feature can be turned off by making the global var,
   * mentioned above, to 'false'.
   */
  if (globals.waitForKeyInputOnTests) {
    const queryProcesses = () => {
      if (processes.length === 0) {
        return queryProcesses;
      }

      const func = processes.shift();

      if (typeof func === 'function') {
        func();
        if (processes.length === 0) {
          globals.functions.coloredLog('*** DONE!!!', 'blue', '\n');
        }
        else {
          globals.functions.coloredLog('*** Press any key to continue...', 'blue', '\n', '\n\n');
        }
      }

      return queryProcesses;
    };

    document.addEventListener('keypress', queryProcesses());
  }
  else {
    // Call them all one after another.
    for (const p of processes) p();
  }
};