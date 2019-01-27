globals.functions.loadJSON(response => {
  const data = JSON.parse(response);
  globals.eventListCollection = new EventListCollection();

  // Check for eventLists data.
  if (data.eventLists) {
    // Iterate through all eventLists.
    for (const eventListData of data.eventLists) {
      const eventList = new EventList();

      // Check for events data.
      if (eventListData.events) {
        // Iterate through all events.
        for (const eventData of eventListData.events) {
          const event = new Event(eventData.name, eventData.date, eventData.requireLawfulAge);

          if (!event.error) {
            // Check for customers data.
            if (eventData.customers) {
              // Iterate through all customers.
              for (const customerData of eventData.customers) {
                const customer = new Customer(customerData.fullName, customerData.sex, customerData.age);

                if (!customer.error) {
                  event.addCustomer(customer);
                }
              }
            }
            eventList.addEvent(event);
          }
        }
      }
      globals.eventListCollection.eventLists.push(eventList);
    }
  }
});