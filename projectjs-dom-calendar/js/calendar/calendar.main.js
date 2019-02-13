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

    globals.updateSelected({
      year: globals.selectedDate.year,
    });
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

    globals.updateSelected({
      month: globals.selectedDate.month,
      year: globals.selectedDate.year,
    });
  });

  /**
   * Debug
   */
  console.log(globals);
};