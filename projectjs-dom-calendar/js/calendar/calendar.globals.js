/**
 * @type {{
 *   selectedDate: {
 *     year: number,
 *     month: LinkedList
 *   },
 *   elements: {
 *     titleYear: jsDOM,
 *     titleMonth: jsDOM
 *   },
 *   isLeapYear: function,
 *   updateSelected: function,
 *   getMonthName: function,
 *   getTotalDays: function,
 *   buildGrid: function,
 * }}
 *
 * Global variable which contains constants and
 * functions, which can be called from anywhere.
 */
const globals = {
  /**
   * Currently selected year and month for the calendar view.
   */
  selectedDate: {
    year: new Date().getFullYear(),
    month: new LinkedList(Array.from(Array(12).keys())).setPointer(new Date().getMonth()),
  },

  /**
   * Preselected HTML elements.
   */
  elements: {
    titleYear: selectDOM('.title-year .title-year--value'),
    titleMonth: selectDOM('.title-month .title-month--value'),
  },

  /**
   * @param year
   * @returns {boolean}
   *
   * Checks weather a given year is a leap year.
   */
  isLeapYear: year => {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    return (year % 4 === 0);
  },

  /**
   * @param data
   *
   * Updates the currently selected year and month and redraws the
   * calendar with the new values.
   */
  updateSelected: (...data) => {
    if (data.month > 11) {
      data.month = 0;
    }

    if (data.year < 0) {
      data.month = new Date().getFullYear();
    }

    if (data.month) globals.selectedDate.month.setPointer(data.month);
    if (data.year) globals.selectedDate.year = data.year;

    globals.elements.titleYear.text(globals.selectedDate.year);
    globals.elements.titleMonth.text(globals.getMonthName(globals.selectedDate.month.getCurrent()));

    globals.buildGrid();
  },

  /**
   * @param month
   * @returns {string}
   *
   * Returns the name of the month using it's numerical value.
   */
  getMonthName: month => {
    return new Date(2000 ,month, 1).toLocaleString('en-us', { month: 'long' });
  },

  /**
   * @param year
   * @param month
   * @returns {number}
   *
   * Returns the total number of days in a month.
   */
  getTotalDays: (year, month) => {
    return new Date(year ,month + 1, 0).getDate();
  },

  /**
   * Builds the HTML calendar.
   */
  buildGrid: () => {
    const days = globals.getTotalDays(globals.selectedDate.year, globals.selectedDate.month.getCurrent());

    let weekDayStart = new Date(globals.selectedDate.year, globals.selectedDate.month.getCurrent(), 1).getDay();
    let weekDayEnd = new Date(globals.selectedDate.year, globals.selectedDate.month.getCurrent(), days).getDay();

    weekDayStart = weekDayStart === 0 ? 6 : weekDayStart - 1;
    weekDayEnd = weekDayEnd === 0 ? 6 : weekDayEnd - 1;

    const grid = Array.from(Array(days).keys()).map(n => ++n);

    const prevMonth = globals.selectedDate.month.clone().prev().getCurrent();
    const prevMonthDays = globals.getTotalDays(globals.selectedDate.year, prevMonth);

    const prevMonthTarget = prevMonthDays - weekDayStart;
    for (let i = prevMonthDays; i > prevMonthTarget; i--) {
      grid.unshift(i);
    }

    const nextMonthTarget = 7 - weekDayEnd;
    for (let i = 1; i < nextMonthTarget; i++) {
      grid.push(i);
    }

    const container = selectDOM('.calendar-container');
    container.children().delete();

    for (let i = 0; i < grid.length; i++) {

      const notCurrentMonth = ((i < 7 &&  grid[i] > prevMonthTarget) || (i > 28 &&  grid[i] < nextMonthTarget));

      const today = new Date();
      const yearCondition  = (globals.selectedDate.year === today.getFullYear());
      const monthCondition = (globals.selectedDate.month.getCurrent() === today.getMonth());
      const dayCondition   = (grid[i] === today.getDate());
      const isCurrentDay = (!notCurrentMonth && yearCondition && monthCondition && dayCondition);

      container.append(`
        <div class="day col-sm p-2 border border-left-0 border-top-0 border-dark text-truncate d-none d-sm-inline-block ${notCurrentMonth ? 'text-muted' : (isCurrentDay ? 'bg-warning' : 'bg-light')}">
          <h5 class="row align-items-center">
            <span class="date col-1">${grid[i]}</span>
            <span class="col-1"></span>
          </h5>
        </div>
      `);

      if ((i + 1) % 7 === 0) {
        container.append('<div class="w-100"></div>');
      }
    }
  },
};
