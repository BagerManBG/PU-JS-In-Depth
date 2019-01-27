/**
 * Task Tests.
 */
window.onload = () => {
  /**
   * Test for #1.1 task.
   */
  console.log('#######   Test for 1.1   #######');
  console.log('Full Data: ', globals.eventListCollection);

  /**
   * Test for #1.2 task.
   */
  console.log('#######   Test for 1.2   #######');
  for (const eventList of globals.eventListCollection.eventLists) {

    console.log(`Events for list #${eventList.id}`);
    for (const event of eventList.events) {

      console.log(`    Event (#${event.id}) ${event.name}: ${event.requireLawfulAge ? '18+' : 'All Ages'}`);
      for (const customer of event.customers) {

        console.log(`        Customer (#${customer.id}) Name: ${customer.fullName}, Age: ${customer.age}, Sex: ${customer.sexVerbose}`);
      }
    }
  }

  /**
   * Test for #1.3 task.
   */
  console.log('#######   Test for 1.3   #######');
  globals.eventListCollection.deleteEvent(60);
  globals.eventListCollection.deleteEvent(5);
  console.log('Full Data: ', globals.eventListCollection);

  /**
   * Test for #1.4 task.
   */
  console.log('#######   Test for 1.4   #######');
  globals.eventListCollection.addEvent(2, new Event('I was added later'));
  console.log('Full Data: ', globals.eventListCollection);

  /**
   * Test for #1.5 task.
   */
  console.log('#######   Test for 1.5   #######');
  globals.eventListCollection.updateEvent(1, 'I used to be Test 1');
  console.log('Full Data: ', globals.eventListCollection);

  /**
   * Test for #1.6 task.
   */
  console.log('#######   Test for 1.6   #######');
  globals.eventListCollection.addCustomer(6, new Customer('Hakuna Matata', 1, 19));
  console.log('Full Data: ', globals.eventListCollection);

  /**
   * Test for #1.7 task.
   */
  console.log('#######   Test for 1.7   #######');
  globals.eventListCollection.listCustomers(1, 0);

  /**
   * Test for #1.8 task.
   */
  console.log('#######   Test for 1.8   #######');
  globals.eventListCollection.deleteCustomer(1);
  console.log('Full Data: ', globals.eventListCollection);

  /**
   * Test for #2.1 task.
   */
  console.log('#######   Test for 2.1   #######');
  globals.functions.updateAdditionState(false);
  globals.eventListCollection.addCustomer(6, new Customer('Hakuna Matata', 1, 19));
  globals.functions.updateAdditionState(true);

  /**
   * Test for #2.2 task.
   */
  console.log('#######   Test for 2.2   #######');
  globals.eventListCollection.addEvent(2, new Event('I was added laterer', '2019-03-31'));
  globals.eventListCollection.updateEvent(1, null, '2019-03-31', null);
  console.log('Full Data: ', globals.eventListCollection);

  /**
   * Test for #2.3 task.
   */
  console.log('#######   Test for 2.3   #######');
  globals.eventListCollection.findLargestEvent();

  /**
   * Test for #2.4 task.
   */
  console.log('#######   Test for 2.4   #######');
  globals.eventListCollection.findNonRequiringLawfulAgeEvents();

  /**
   * Test for #2.5 task.
   */
  console.log('#######   Test for 2.5   #######');
  globals.eventListCollection.listEventsGroupByRequireLawfulAge();

  /**
   * Test for #2.6 task.
   */
  console.log('#######   Test for 2.6   #######');
  globals.eventListCollection.filterEvents('namennnnnn', 'Test 2');
  globals.eventListCollection.filterEvents('name', 'Test 2');
  globals.eventListCollection.filterEvents('requireLawfulAge', false);
};