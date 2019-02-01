/**
 * @type {
 *   {
 *     customersList: Array,
 *     regEx: {date: RegExp},
 *     lawfulAge: number,
 *     functions: {},
 *     eventsList: Array,
 *     idCounter: {},
 *     allowAdditions: boolean,
 *     waitForKeyInputOnTests: boolean,
 *     currencyCode: string
 *   }
 * }
 *
 * Global variable. Contains everything
 * global in one object for easier access.
 */
const globals = {
  lawfulAge: 18,
  currencyCode: 'BGN',
  waitForKeyInputOnTests: false,
  allowAdditions: true,
  idCounter: {},
  functions: {},
  eventsList: [],
  customersList: [],
  regEx: {
    date: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
  },
};

/**
 * @param callback
 * @param url
 *
 * Function for loading data from events.json
 * and then executing a callback function
 * and passing it the result of the AJAX call.
 */
globals.functions.loadJSON = (url, callback) => {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
};

/**
 * @param value
 *
 * Function for updating the state of
 * the allowance for content adding.
 */
globals.functions.updateAdditionState = value => {
  value = Boolean(value);
  globals.allowAdditions = value;
  console.log(`Global flag allowAdditions was turned ${value ? 'ON' : 'OFF'}!`);
};

/**
 * @param string
 * @param color
 * @param prefix
 * @param suffix
 *
 * A custom console.log with the choice for adding a color.
 */
globals.functions.coloredLog = (string, color, prefix = '', suffix = '') => {
  console.log(prefix + '%c' + string + suffix, 'color: ' + color);
};

/**
 * @param price
 * @returns {string}
 *
 * A custom price formatter. Returns price
 * formatted like this (10.00 BGN).
 */
globals.functions.formatPrice = price => {
  if (!isNaN(Number(price))) {
    return price.toFixed(2) + ' ' + globals.currencyCode;
  }
};
