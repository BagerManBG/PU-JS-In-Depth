/**
 * Task Tests.
 *
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
    console.log('Full Data: ', globals);
  });

  /**
   * Test for #1.2 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.2   #######', 'green', '\n');
    for (const event of globals.eventsList) {
      if (event) {
        console.log(`Event (#${event.id}) ${event.getName()}: ${event.requireLawfulAge ? '18+' : 'All Ages'}.`);
      }
    }
  });

  /**
   * Test for #1.3 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.3   #######', 'green', '\n');
    EventController.findEvent(5).deleteEvent();
    console.log('Full Data: ', globals);
  });

  /**
   * Test for #1.4 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.4   #######', 'green', '\n');
    EventController.addEvent({
      name: 'I was added later',
      requireLawfulAge: true,
    });
    console.log('Full Data: ', globals);
  });

  /**
   * Test for #1.5 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.5   #######', 'green', '\n');
    EventController.findEvent(1).updateEvent({name: 'I used to be Test 1'});
    console.log('Full Data: ', globals);
  });

  /**
   * Test for #1.6 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.6   #######', 'green', '\n');
    EventController.findEvent(6).addCustomer({
      name: 'Hakuna Matata',
      sex: 1,
      age: 19,
    });
    console.log('Full Data: ', globals);
  });

  /**
   * Test for #1.7 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.7   #######', 'green', '\n');
    EventController.findEvent(2).listCustomers(1);
    EventController.findEvent(4).listCustomers(1);
    EventController.findEvent(4).listCustomers(0);
  });

  /**
   * Test for #1.8 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 1.8   #######', 'green', '\n');
    EventController.findEvent(1).removeCustomer(3);
    console.log('Full Data: ', globals);
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
    EventController.findEvent(6).addCustomer({
      name: 'Hakuna Matata',
      sex: 1,
      age: 19,
    });
    globals.functions.updateAdditionState(true);
  });

  /**
   * Test for #2.2 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.2   #######', 'green', '\n');
    EventController.addEvent({
      name: 'I was added laterer',
      date: '2019-03-31',
    });
    EventController.findEvent(1).updateEvent({date: '2019-03-31'});
    console.log('Full Data: ', globals);
  });

  /**
   * Test for #2.3 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.3   #######', 'green', '\n');
    EventController.findLargestEvent();
  });

  /**
   * Test for #2.4 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.4   #######', 'green', '\n');
    EventController.filterEvents('requireLawfulAge', true);
    EventController.filterEvents('requireLawfulAge', false);
    EventController.filterEvents('all');
  });

  /**
   * Test for #2.5 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.5   #######', 'green', '\n');
    EventController.groupEvents('requireLawfulAge', a => a, '*', '#');
  });

  /**
   * Test for #2.6 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 2.6   #######', 'green', '\n');
    EventController.filterEvents('namennnnnn', 'Test 2');
    EventController.filterEvents('name', 'Test 2');
    EventController.filterEvents('requireLawfulAge', false);
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
    EventController
      .addEvent({
        name: 'Dobi is free',
        date: '2019-06-31',
        price: 0,
      });
    EventController
      .addEvent({
        name: 'Dobi is freen\'t',
        date: '2019-06-31',
        price: 10,
      });
    console.log('Full Data: ', globals);
  });

  /**
   * Test for #3.3 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 3.3   #######', 'green', '\n');
    const events = EventController.filterEvents('all');
    for (const event of events) {
      console.log(`Event (#${event.id}) -> Name: "${event.getName()}".`);
    }
  });

  /**
   * Test for #3.4 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 3.4   #######', 'green', '\n');
    EventController.findEvent(9).addCustomer(4);
    EventController.findEvent(8).addCustomer(1);
    EventController.findEvent(7).addCustomer(1);
    EventController.findEvent(6).addCustomer(1);
    EventController.findEvent(4).addCustomer(1);
    EventController.findEvent(3).addCustomer(1);
    EventController.findEvent(2).addCustomer(5);
    EventController.findEvent(1).addCustomer(5);
    console.log('Full Data: ', globals);
  });

  /**
   * Test for #3.5 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 3.5   #######', 'green', '\n');
    EventController.findEvent(1).addCustomer(1); // this is customer #1's free event.
    console.log('Full Data: ', globals);
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
    EventController
      .findEvent(1)
      .archiveEvent()
      .addCustomer(1);
    console.log('Full Data: ', globals);
  });

  /**
   * Test for #4.2 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.2   #######', 'green', '\n');
    console.log(EventController.findEvent(1).getName());
    console.log(EventController.findEvent(2).getName());
  });

  /**
   * Test for #4.3 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.3   #######', 'green', '\n');
    EventController.filterEvents('all');
    EventController.filterEvents('isClosed', false);
    EventController.filterEvents('isClosed', true);
  });

  /**
   * Test for #4.4 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.4   #######', 'green', '\n');
    const events = EventController.filterEvents('all');
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
    EventController
      .findCustomer(1)
      .selectEvent(6)
      .rateEvent(2);
    EventController
      .findCustomer(7)
      .selectEvent(6)
      .rateEvent(10);
  });

  /**
   * Test for #4.6 task.
   */
  processes.push(() => {
    globals.functions.coloredLog('#######   Test for 4.6   #######', 'green', '\n');
    const events = EventController.filterEvents('all');
    for (const event of events) {
      console.log(`Event (#${event.id}) ${event.getName()} has Rating: ${event.getRating()}`);
    }
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
