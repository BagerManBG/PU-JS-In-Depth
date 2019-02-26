const globals = {

  /**
   * Contains all the settings for the app.
   */
  settings: {},

  /**
   * List of required stats for playable entities.
   */
  requiredStats: ['attack', 'armor', 'health', 'range', 'speed'],

  /**
   * Contains all classes for entities, so that they can be called dynamically.
   */
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

  /**
   * @param string
   * @returns {string}
   *
   * Takes a string and returns it with first letter capitalized.
   */
  capitalizeFirstLetter: string => {
    return String(string).charAt(0).toUpperCase() + string.slice(1);
  },

  /**
   * @param arr
   * @param elem
   *
   * @return array
   *
   * Finds and removes an element from array.
   */
  removeFromArray: (arr, elem) => {
    const index = arr.indexOf(elem);
    arr.splice(index, 1);
    return arr;
  },
};
