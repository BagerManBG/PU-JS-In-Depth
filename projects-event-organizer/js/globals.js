const globals = {
  lawfulAge: 18,
  currencyCode: 'BGN',
  waitForKeyInputOnTests: false,
  allowAdditions: true,
  eventListCollection: {},
  idCounter: {},
  functions: {},
  customersList: [],
  regEx: {
    date: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
  },
};

/**
 * @param callback
 *
 * Function for loading data from data.json
 * and then executing a callback function
 * and passing it the result of the AJAX call.
 */
globals.functions.loadJSON = callback => {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './data/data.json', true);
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
  globals.allowAdditions = Boolean(value);
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
