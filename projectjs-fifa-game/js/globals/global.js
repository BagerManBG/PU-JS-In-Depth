let globals = {

  MusAJAX: new MusAJAX(),

  Router: new Router(),

  elements: {
    title: null,
    content: null,
  },

  countries: null,

  endpoints: {
    teams: 'http://worldcup.sfg.io/teams',
    teams_group_results: 'http://worldcup.sfg.io/teams/group_results',
    matches: 'http://worldcup.sfg.io/matches',
    matches_country: 'http://worldcup.sfg.io/matches/country',
  },

  formatDate: dateString => {
    return dateString ? new Date(dateString).toUTCString() : false;
  },

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
};