let globals = {

  MusAJAX: new MusAJAX(),

  Router: new Router(),

  elements: {
    title: null,
    content: null,
  },

  endpoints: {
    teams: 'http://worldcup.sfg.io/teams',
    group_results: 'http://worldcup.sfg.io/teams/group_results',
    matches: 'http://worldcup.sfg.io/matches',
    country: 'http://worldcup.sfg.io/matches/country',
  },

  formatDate: dateString => {
    return dateString ? new Date(dateString).toUTCString() : false;
  },
};