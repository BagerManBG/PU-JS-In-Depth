/**
 * Setup.js - querying events.json and
 * creating objects based on file contents.
 */
globals.functions.loadJSON('./data/events.json', response => {
  console.log('%c#######   Starting setup, reading data from events.json...   #######', 'color: green');
  const data = JSON.parse(response);

  if (data && data.events) {
    // Iterate through all events.
    for (const eventData of data.events) {
      const event = EventController.addEvent(eventData);

      if (eventData.customers) {
        // Iterate through all customers.
        for (const customerData of eventData.customers) {
          event.addCustomer(customerData);
        }
      }
    }
  }
});
