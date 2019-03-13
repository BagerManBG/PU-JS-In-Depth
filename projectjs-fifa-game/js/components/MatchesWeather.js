globals.Router.register('/matches/weather', 'Matches Weather', function (searchParams) {
  const build = (data = null) => {
    let markup = '';

    markup += (`
        <table class="table table-bordered">
          <thead>
            <tr class="d-flex">
              <th class="col-3">Location</th>
              <th class="col-2">Date</th>
              <th class="col-2">Teams</th>          
              <th class="col-2">Weather Description</th> 
              <th class="col-1">Humidity</th>          
              <th class="col-1">Temperature</th>          
              <th class="col-1">Wind Speed</th>                             
            </tr>
          </thead>
          <tbody>
      `);

    for (const match of data) {
      markup += (`
          <tr class="d-flex">
            <td class="col-3">${match['venue']}, ${match['location']}</td>
            <td class="col-2">${globals.functions.formatDate(match['datetime']) || 'Unknown'}</td>
            <td class="col-2">${match['home_team_country']} vs ${match['away_team_country']}</td>
            <td class="col-2">${match['weather']['description']}</td>
            <td class="col-1">${match['weather']['humidity']}%</td>
            <td class="col-1">${match['weather']['temp_celsius']} °C&nbsp;&nbsp;/&nbsp;&nbsp;${match['weather']['temp_farenheit']} °F</td>
            <td class="col-1">${match['weather']['wind_speed']} m/s</td>            
          </tr>
        `);
    }

    markup += (`
          </tbody>
        </table>
      `);

    globals.Router.render ({
      markup: markup,
    });
  };

  globals.MusAJAX.get(globals.endpoints.matches, build);
});
