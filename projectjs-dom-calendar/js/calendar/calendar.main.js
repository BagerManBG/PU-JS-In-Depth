/**
 * Calendar.
 *
 * This file contains the initialization of the calendar
 * after the page has loaded.
 */
window.onload = () => {
  globals.updateCalendar();

  /**
   * Registering an event subscriber for Year Arrows.
   */
  globals.elements.titleYear.siblings().on('click', function () {
    const $this = selectDOM(this);
    const dir = $this.attr('data-direction');

    if (dir === 'next') globals.selectedDate.year++;
    else if (dir === 'prev') globals.selectedDate.year--;

    globals.updateCalendar();
  });

  /**
   * Registering an event subscriber for Month Arrows.
   */
  globals.elements.titleMonth.siblings().on('click', function () {
    const $this = selectDOM(this);
    const dir = $this.attr('data-direction');

    if (dir === 'next') {
      globals.selectedDate.month.next();

      if (globals.selectedDate.month.didJump()) {
        globals.selectedDate.year++;
      }
    }
    else if (dir === 'prev') {
      globals.selectedDate.month.prev();

      if (globals.selectedDate.month.didJump()) {
        globals.selectedDate.year--;
      }
    }

    globals.updateCalendar();
  });

  /**
   * Registering an event subscriber for Month Arrows.
   */
  globals.elements.titleWeek.siblings().on('click', function () {
    const $this = selectDOM(this);
    const dir = $this.attr('data-direction');

    if (dir === 'next') {
      globals.selectedDate.week.next();

      if (globals.selectedDate.week.didJump()) {
        globals.selectedDate.year++;
      }
    }
    else if (dir === 'prev') {
      globals.selectedDate.week.prev();

      if (globals.selectedDate.week.didJump()) {
        globals.selectedDate.year--;
      }
    }

    globals.updateCalendar();
  });

  /**
   * Closes modal window for events.
   */
  globals.elements.eventsModal.close.on('click', function () {
    globals.elements.eventsModal.overlay.css('display', 'none');
    globals.elements.eventsModal.modal.css('display', 'none');
  });

  /**
   * Changes calendar view.
   */
  globals.elements.viewModeSwitch.on('change', function () {
    const useWeekView = selectDOM(this).get(0).prop('checked');
    globals.calendarView = useWeekView ? 'week' : 'month';

    const eventsObj = loadJSON('./data/events.json');

    if (eventsObj && eventsObj.hasOwnProperty('events')) {
      const events =  eventsObj.events;
      events.forEach(e => e.date = new Date(e.timestamp));
      events.sort((a, b) => a.date > b.date);

      const result = {};
      for (const event of events) {

        const year = event.date.getFullYear();
        const month = event.date.getMonth();
        const week = event.date.getWeek();

        const secondClasificator = useWeekView ? week : month;

        if (!result[year]) {
          result[year] = {};
        }

        if (!result[year][secondClasificator]) {
          result[year][secondClasificator] = [];
        }

        result[year][secondClasificator].push(event);
      }

      globals.eventData = result;
    }
    else {
      console.error('Events JSON is in bad format!');
    }

    globals.updateCalendar();
  });

  /**
   * Method used when focusing the date picker.
   */
  globals.elements.datePicker.on('focus', function () {
    selectDOM(this).prop('focused', true);
  });

  /**
   * Method user for removing the focus from the date picker.
   */
  globals.elements.datePicker.on('blur', function () {
    setTimeout(function () {
      globals.elements.datePicker.prop('focused', false);
    }, 400);
  });
};