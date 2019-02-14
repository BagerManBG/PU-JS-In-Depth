/**
 * @returns {number}
 *
 * Custom getWeek function for the Date object.
 */
Date.prototype.getWeek = function () {
  const oneJan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
};

/**
 * @type {{
 *   calendarView: string,
 *   selectedDate: {
 *     year: number,
 *     month: LinkedList
 *     week: LinkedList
 *   },
 *   elements: {
 *     titleYear: jsDOM,
 *     titleMonth: jsDOM,
 *     viewModeSwitch: jsDOM,
 *     datePicker: jsDOM,
 *     eventsModal: {
 *       overlay: jsDOM,
 *       modal: jsDOM,
 *       selectedDay: jsDOM,
 *       events: jsDOM,
 *       close: jsDOM,
 *     },
 *   },
 *   eventData: object,
 *   isLeapYear: function,
 *   updateSelected: function,
 *   getMonthName: function,
 *   getTotalDays: function,
 *   buildGrid: function,
 *   fillEvents: function,
 * }}
 *
 * Global variable which contains constants and
 * functions, which can be called from anywhere.
 */
const globals = {
  /**
   * Currently selected view for calendar.
   */
  calendarView: 'month',

  /**
   * Currently selected year and month for the calendar view.
   */
  selectedDate: {
    year: new Date().getFullYear(),
    month: new LinkedList(Array.from(Array(12).keys())).setPointer(new Date().getMonth()),
    week: new LinkedList(Array.from(Array(53).keys()).map(i => i + 1)).setPointer(new Date().getWeek() - 1),
  },

  /**
   * Preselected HTML elements.
   */
  elements: {
    titleYear: selectDOM('.title-year .title-year--value'),
    titleMonth: selectDOM('.title-month .title-month--value'),
    titleWeek: selectDOM('.title-week .title-week--value'),
    viewModeSwitch: selectDOM('.calendar-view-switch'),
    datePicker: selectDOM('input[name="date-picker"]'),
    eventsModal: {
      overlay: selectDOM('.overlay'),
      modal: selectDOM('.events-modal'),
      selectedDay: selectDOM('.events-modal .selected-day'),
      events: selectDOM('.events-modal .events'),
      close: selectDOM('.events-modal .close-modal'),
    },
  },

  /**
   * @returns {Object|boolean}
   *
   * Starting data for events fetched from events.json file.
   */
  eventData: (function(){
    const eventsObj = loadJSON('./data/events.json');

    if (eventsObj && eventsObj.hasOwnProperty('events')) {
      const events =  eventsObj.events;
      events.forEach(e => e.date = new Date(e.timestamp));
      events.sort((a, b) => a.date > b.date);

      const result = {};
      for (const event of events) {

        const year = event.date.getFullYear();
        const month = event.date.getMonth();

        if (!result[year]) {
          result[year] = {};
        }

        if (!result[year][month]) {
          result[year][month] = [];
        }

        result[year][month].push(event);
      }

      return result;
    }

    console.error('Events JSON is in bad format!');
    return false;
  })(),

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
   * Updates the UI part of the calendar, using the variables
   * that are stored globally.
   */
  updateCalendar: () => {
    const useWeekView = globals.elements.viewModeSwitch.prop('checked');

    globals.elements.titleWeek.parent().css('display', useWeekView ? 'flex' : 'none');
    globals.elements.titleMonth.parent().css('display', useWeekView ? 'none' : 'flex');

    globals.elements.titleYear.text(globals.selectedDate.year);
    globals.elements.titleMonth.text(globals.getMonthName(globals.selectedDate.month.getCurrent()));
    globals.elements.titleWeek.text('Week ' + globals.selectedDate.week.getCurrent());

    globals.buildGrid();
    globals.fillEvents();

    /**
     * On click at a date tile it opens all events. But if the date picker was
     * previously focused, then it sets the selected date as it's value.
     */
    selectDOM('[data-month-state="current"]').on('click', function () {
      const $this = selectDOM(this);

      if (globals.elements.datePicker.prop('focused')) {
        const date = new Date(globals.selectedDate.year, Number($this.attr('data-month')), Number($this.attr('data-day')));
        globals.elements.datePicker.val(date.toDateString())
      }
      else {
        globals.elements.eventsModal.overlay.css('display', 'block');
        globals.elements.eventsModal.modal.css('display', 'block');

        const year = globals.selectedDate.year;
        const secondSelector = globals.selectedDate[globals.calendarView].getCurrent();
        const month = globals.calendarView === 'month' ? globals.selectedDate.month.getCurrent() : 0;
        const week = globals.selectedDate.week.getCurrent();
        const day = Number($this.attr('data-day'));

        const date = new Date(year, month, globals.calendarView === 'week' ? (1 + (week - 1) * 7) : day);
        globals.elements.eventsModal.selectedDay.text(date.toDateString());

        let events = [];
        if (globals.eventData[year] && globals.eventData[year][secondSelector]) {
          events = globals.eventData[year][secondSelector].filter(e => e.date.getDate() === day);
        }

        globals.elements.eventsModal.events.children().delete();

        if (events.length > 0) {
          for (const event of events) {
            globals.elements.eventsModal.events.append(`
              <p>${event.text} at ${event.date.toLocaleTimeString('en-US')}</p>
            `);
          }
        }
        else {
          globals.elements.eventsModal.events.append('<p>No events for this day!</p>');
        }
      }
    });
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
   * @param view
   *
   * Builds the HTML calendar.
   */
  buildGrid: (view = globals.calendarView) => {
    let grid = [];

    if (view === 'month') {
      const days = globals.getTotalDays(globals.selectedDate.year, globals.selectedDate.month.getCurrent());

      let weekDayStart = new Date(globals.selectedDate.year, globals.selectedDate.month.getCurrent(), 1).getDay();
      let weekDayEnd = new Date(globals.selectedDate.year, globals.selectedDate.month.getCurrent(), days).getDay();

      weekDayStart = weekDayStart === 0 ? 6 : weekDayStart - 1;
      weekDayEnd = weekDayEnd === 0 ? 6 : weekDayEnd - 1;

      grid = Array.from(Array(days).keys()).map(n => {
        return {
          date: ++n,
          month: globals.selectedDate.month.getCurrent(),
          notCurrentMonth: false,
        };
      });

      const prevMonth = globals.selectedDate.month.clone().prev().getCurrent();
      const nextMonth = globals.selectedDate.month.clone().next().getCurrent();
      const prevMonthDays = globals.getTotalDays(globals.selectedDate.year, prevMonth);

      const prevMonthTarget = prevMonthDays - weekDayStart;
      const nextMonthTarget = 7 - weekDayEnd;

      for (let i = prevMonthDays; i > prevMonthTarget; i--) {
        grid.unshift({
          date: i,
          month: prevMonth,
          notCurrentMonth: true,
        });
      }


      for (let i = 1; i < nextMonthTarget; i++) {
        grid.push({
          date: i,
          month: nextMonth,
          notCurrentMonth: true,
        });
      }
    }
    else if (view === 'week') {
      const firstDate = new Date(globals.selectedDate.year, 0, 1);
      const firstDayValue = firstDate.getDay();
      let currentDayOffset = firstDayValue - 1;

      if (globals.selectedDate.week.getCurrent() === 1) {
        const daysInDecember = 31;
        currentDayOffset = 0;

        for (let i = daysInDecember; i > daysInDecember - firstDayValue + 1; i--) {
          grid.unshift({
            date: i,
            month: 11,
            notCurrentMonth: true,
          });
        }
      }

      const currentDay = ((globals.selectedDate.week.getCurrent() - 1) * 7) + 1 - currentDayOffset;
      const currentDate = new Date(globals.selectedDate.year, 0, currentDay);
      const target = currentDayOffset === 0 ? 8 - firstDayValue : 7;

      for (let i = 0; i < target; i++) {

        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        currentDate.setDate(date + 1);

        grid.push({
          date: date,
          month: month,
          notCurrentMonth: (year !== globals.selectedDate.year),
        });
      }
    }

    const container = selectDOM('.calendar-container');
    container.children().delete();

    for (let i = 0; i < grid.length; i++) {
      const today = new Date();
      const yearCondition  = (globals.selectedDate.year === today.getFullYear());
      const weekCondition  = view === 'week' ? (globals.selectedDate.week.getCurrent() === today.getWeek()) : false;
      const monthCondition = view === 'month' ? (globals.selectedDate.month.getCurrent() === today.getMonth()) : false;
      const dayCondition   = (grid[i].date === today.getDate());
      const isCurrentDay   = (!grid[i].notCurrentMonth && yearCondition && (monthCondition || weekCondition) && dayCondition);

      const classString = `class="day col-sm p-2 border border-left-0 border-top-0 border-dark text-truncate d-none d-sm-inline-block ${grid[i].notCurrentMonth ? 'text-muted' : 'cursor-pointer ' + (isCurrentDay ? 'bg-warning' : 'bg-light')}"`;
      const dataString = !grid[i].notCurrentMonth ? `data-day="${grid[i].date}" data-month="${grid[i].month || globals.selectedDate.month.getCurrent()}" data-month-state="current"` : 'data-month-state="other"';

      container.append(`
        <div ${classString} ${dataString}>
          <h5 class="row align-items-center">
            <span class="date col-1">${grid[i].date} ${globals.getMonthName(grid[i].month)}</span>
            <span class="col-1"></span>           
          </h5>
        </div>
      `);

      if ((i + 1) % 7 === 0) {
        container.append('<div class="w-100"></div>');
      }
    }
  },

  /**
   * Builds the events into the calendar.
   */
  fillEvents: () => {
    if (globals.eventData[globals.selectedDate.year]) {
      const currentEvents = globals.eventData[globals.selectedDate.year][globals.selectedDate[globals.calendarView].getCurrent()];

      if (currentEvents) {
        for (const event of currentEvents) {
          selectDOM(`[data-day="${event.date.getDate()}"][data-month="${event.date.getMonth()}"]`).append(`
            <a class="event d-block p-1 pl-2 pr-2 mb-1 rounded text-truncate small bg-info text-white" title="${event.text}">${event.text}</a>
          `);
        }
      }
    }
  },
};

/**
 * @param url
 * @returns {Object|boolean}
 *
 * Gets JSON data from a file and returns it as an Array.
 */
function loadJSON (url) {
  if (!/\.json$/.test(url)) {
    console.error('Target is not a JSON file!');
    return false;
  }

  let resultArr = [];
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      resultArr = JSON.parse(xobj.responseText);
    }
    else {
      console.error(`Could not retrieve data from ${url}!`);
      return false;
    }
  };
  xobj.send(null);

  return resultArr;
}
