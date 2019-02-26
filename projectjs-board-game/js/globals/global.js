const globals = {

  settings: {},

  requiredStats: ['attack', 'armor', 'health', 'range', 'speed'],

  entityClasses: {},

  /**
   * @param url
   * @returns {Object|boolean}
   *
   * Gets JSON data from a file and returns it as an Array.
   */
  loadJSON: url => {
    if (!/\.json$/.test(url)) {
      console.error('Target is not a JSON file!');
      return false;
    }

    let resultArr = [];
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
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
  },

  capitalizeFirstLetter: string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
