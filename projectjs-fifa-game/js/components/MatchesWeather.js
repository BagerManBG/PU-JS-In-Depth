globals.Router.register('/matches/weather', 'Matches Weather', function (searchParams) {
  const build = (data = null) => {
    let markup = '';

    markup += (`
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Location</th>
              <th>Date</th>
              <th>Teams</th>          
              <th>Weather Description</th> 
              <th>Humidity</th>          
              <th>Temperature</th>          
              <th>Wind Speed</th>                             
            </tr>
          </thead>
          <tbody>
      `);

    for (const match of data) {
      markup += (`
          <tr>
            <td>${match['venue']}, ${match['location']}</td>
            <td>${globals.formatDate(match['datetime']) || 'Unknown'}</td>
            <td>${match['home_team_country']} vs ${match['away_team_country']}</td>
            <td>${match['weather']['description']}</td>
            <td>${match['weather']['humidity']}%</td>
            <td>${match['weather']['temp_celsius']} °C&nbsp;&nbsp;/&nbsp;&nbsp;${match['weather']['temp_farenheit']} °F</td>
            <td>${match['weather']['wind_speed']} m/s</td>            
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
