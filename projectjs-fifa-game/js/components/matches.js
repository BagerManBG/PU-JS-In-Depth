globals.Router.register('matches', function (searchParams) {
  globals.elements.title.text('Matches');

  const filterByLocality = function (data, locality, country_code) {
    return data.filter(d => d[locality + '_team']['code'] === country_code);
  };

  const filterByOutcome = function (data, outcome, country_code) {
    return data.filter(d => {
      switch (outcome) {
        case 'win':
          console.log((d['winner_code'] === country_code && d['winner_code'] !== 'Draw'));
          return (d['winner_code'] === country_code && d['winner_code'] !== 'Draw');
        case 'loss':
          return (d['winner_code'] !== country_code && d['winner_code'] !== 'Draw');
        case 'draw':
          return (d['winner_code'] === 'Draw');
        default:
          return false;
      }
    });
  };

  const resolveSearch = () => {
    if (searchParams['country'] && searchParams['country'] !== 'all') {
      globals.MusAJAX.get(globals.endpoints.matches_country + '?fifa_code=' + searchParams['country'], build);
    }
    else {
      globals.MusAJAX.get(globals.endpoints.matches, build);
    }
  };

  const build = (data = null) => {
    let markup = '';
    let country_options = '';

    if (
      searchParams['country'] &&
      searchParams['locality'] &&
      searchParams['country'] !== 'all' &&
      searchParams['locality'] !== 'all'
    ) {
      data = filterByLocality(data, searchParams['locality'], searchParams['country']);
    }

    if (
      searchParams['country'] &&
      searchParams['outcome'] &&
      searchParams['country'] !== 'all' &&
      searchParams['outcome'] !== 'all'
    ) {
      data = filterByOutcome(data, searchParams['outcome'], searchParams['country']);
    }

    for (const index in globals.countries) {
      country_options += (`
        <option value="${globals.countries[index]['fifa_code']}" ${searchParams['country'] === globals.countries[index]['fifa_code'] ? 'selected' : ''}>${globals.countries[index]['country']}</option>
      `);
    }

    markup += (`
        <div class="container ml-0 mb-4">
          <h2>Search by country</h2>
          <p>Enter parameters to select data only from a certain set of counties.</p>
          <form class="form-inline" role="form">
            <label for="country-input" class="mb-2 mr-sm-2">Country:</label>
            <select class="form-control mb-2 mr-sm-4" id="country-input">
              <option value="all" ${!searchParams['country'] || searchParams['country'] === 'all' ? 'selected' : ''}>All</option>
              ${country_options}
            </select>                  
            
            <label for="locality-input" class="mb-2 mr-sm-2">Select Team Locality:</label>
            <select class="form-control mb-2 mr-sm-4" id="locality-input">
              <option value="all" ${!searchParams['locality'] || searchParams['locality'] === 'all' ? 'selected' : ''}>All</option>
              <option value="home" ${searchParams['locality'] === 'home' ? 'selected' : ''}>Home</option>
              <option value="away" ${searchParams['locality'] === 'away' ? 'selected' : ''}>Away</option>
            </select>
            
            <label for="outcome-input" class="mb-2 mr-sm-2">Match Outcome:</label>
            <select class="form-control mb-2 mr-sm-4" id="outcome-input">
              <option value="all" ${!searchParams['outcome'] || searchParams['outcome'] === 'all' ? 'selected' : ''}>All</option>
              <option value="win" ${searchParams['outcome'] === 'win' ? 'selected' : ''}>Win</option>
              <option value="draw" ${searchParams['outcome'] === 'draw' ? 'selected' : ''}>Draw</option>
              <option value="loss" ${searchParams['outcome'] === 'loss' ? 'selected' : ''}>Loss</option>
            </select>
            
            <button type="button" class="btn btn-primary mb-2" id="search">Search</button>
          </form>
        </div>
    `);

    markup += (`
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Location</th>
              <th>Date</th>
              <th>Teams</th>
              <th>Goals</th>
              <th>Winner</th>             
            </tr>
          </thead>
          <tbody>
      `);

    for (const match of data) {
      markup += (`
          <tr>
            <td>${match['venue']} ${match['location']}</td>
            <td>${globals.formatDate(match['datetime']) || 'Unknown'}</td>
            <td>${match['home_team_country']} vs ${match['away_team_country']}</td>
            <td>${match['home_team_statistics']['on_target']} - ${match['away_team_statistics']['on_target']}</td>
            <td>${match['winner'] || 'Unknown'}</td>
          </tr>
        `);
    }

    markup += (`
          </tbody>
        </table>
      `);

    globals.elements.content.html(markup);

    selectDOM('#search').on('click', function () {
      const country = selectDOM('#country-input').get(0).val();

      globals.Router.setQueryParams({
        country: country,
        locality: country === 'all' ? 'all' : selectDOM('#locality-input').get(0).val(),
        outcome: country === 'all' ? 'all' : selectDOM('#outcome-input').get(0).val(),
      });
    });
  };

  !Boolean(globals.countries) ? globals.getCountries(resolveSearch) : resolveSearch();
});