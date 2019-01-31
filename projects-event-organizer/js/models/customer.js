/**
 * class Customer.
 *
 * This class is used to model the creations of Customer objects.
 * Customer objects are stored in a global list.
 */
class Customer {
  /**
   * @param customerData
   *
   * Creates a customer object. Name, sex and age
   * fields are required. Default wallet is 0.
   */
  constructor(customerData) {
    const isAgeCorrect = (isNaN(Number(customerData.age)) || Number(customerData.age) <= 0);
    const isWalletCorrect = (customerData.wallet && (isNaN(Number(customerData.wallet)) || Number(customerData.wallet) < 0));

    if (!globals.allowAdditions) {
      console.error('Additions are forbidden at the moment!');
      this.error = true;
    }
    else if (!customerData.name || !customerData.sex == null || !customerData.age) {
      console.error('Name, sex and age are required attributes!');
      this.error = true;
    }
    else if (isAgeCorrect || isWalletCorrect) {
      console.error('Age and wallet must be proper numbers and \'> 0\'!');
      this.error = true;
    }
    else {
      this.id = globals.idCounter.customer ? ++globals.idCounter.customer : globals.idCounter.customer = 1;
      this.name = customerData.name;
      this.sex = customerData.sex;
      this.sexVerbose = Boolean(customerData.sex) ? 'Female' : 'Male';
      this.age = Number(customerData.age);
      this.wallet = Number(customerData.wallet || 0);
      this.eventsCount = 0;
      this.selectedEvent = null;
      this.isVIP = false;

      globals.customersList[this.id] = this;
      console.log(`Customer #${this.id} was created`);
    }
  }

  /**
   * @param eventId
   * @return {Customer}
   *
   * Selects an event to work with when using other methods of this class.
   */
  selectEvent(eventId) {
    if (!isNaN(Number(eventId))) {
      this.selectedEvent = Number(eventId);
    }
    else {
      console.error('Bad Id Format!');
    }
    return this;
  }

  /**
   * @param rating
   * @param eventId
   * @returns {Customer}
   *
   * Rates an event from 1 to 10. If an event id is not provided by the user,
   * the method will try to use the selected event. If there are no errors,
   * the event is rated and the current objects is returned.
   */
  rateEvent(rating, eventId = this.selectedEvent) {
    const event = EventController.findEvent(eventId);

    if (!event) {
      console.error('Event with id specified cannot be found!');
    }
    else if (!event.isClosed) {
      console.error('Only archived events can be rated');
    }
    else if (!event.customers[this.id]) {
      console.error('Customer with id specified cannot be found or is not part of this event!');
    }
    else if (event.ratings[this.id] !== 0) {
      console.error('This customer has already rated the event!');
    }
    else if (isNaN(Number(rating))) {
      console.error('Rating must be a number!');
    }
    else if (rating <= 0 || rating > 10) {
      console.error('Rating must be a number from 1 to 10 inclusive.');
    }
    else {
      event.ratings[this.id] = rating;
      event.updateRating();
      console.log(`Customer (#${this.id}) rated Event (#${eventId}) with a ${rating} / 10 score!`);
    }
    return this;
  }
}
