let globals = {
  /**
   * Global MusAJAX object.
   */
  MusAJAX: new MusAJAX(),

  /**
   * Global Router object.
   */
  Router: new Router(),

  /**
   * Global Cookie object.
   */
  Cookie: new Cookie(),

  /**
   * Placeholder for list of countries in the dataset.
   */
  countries: null,

  /**
   * Constant, used to name the history cookie.
   */
  history_cookie_key: 'fifa_history_stack',

  /**
   * History of visited pages.
   */
  history: [],

  /**
   * Placeholder for selected HTML elements.
   */
  elements: {
    title: null,
    navigation: null,
    content: null,
  },

  /**
   * Predefined object with available endpoints for getting data.
   */
  endpoints: {
    teams: 'http://worldcup.sfg.io/teams',
    teams_group_results: 'http://worldcup.sfg.io/teams/group_results',
    matches: 'http://worldcup.sfg.io/matches',
    matches_country: 'http://worldcup.sfg.io/matches/country',
  },

  /**
   * Holds global functions.
   */
  functions: {
    /**
     * @param dateString
     * @return {string|null}
     *
     * Outputs a date string in a proper UTC format.
     */
    formatDate: dateString => {
      return dateString ? new Date(dateString).toUTCString() : null;
    },

    /**
     * @param callback
     *
     * Gets all available countries from the API.
     */
    getCountries: (callback = null) => {
      globals.MusAJAX.get(globals.endpoints.teams, function (data) {
        if (data) {
          const raw = {};
          for (const index in data) {
            raw[data[index]['fifa_code']] = data[index];
          }

          globals.countries = {};
          Object.keys(raw).sort().forEach(function(key) {
            globals.countries[key] = raw[key];
          });
        }
        if (typeof callback === 'function') callback(data);
      })
    }
  },
};
