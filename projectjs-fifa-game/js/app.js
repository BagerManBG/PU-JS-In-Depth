window.onload = () => {
  globals.Router.setDefaultRoute('matches');

  globals.elements.title = selectDOM('#title');
  globals.elements.content = selectDOM('#content');

  globals.Router.register('matches', function () {
    globals.elements.title.text('Matches');

    globals.MusAJAX.get(globals.endpoints.matches, function (data) {
      let markup = (`
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
    })
  });

  globals.Router.match();
};

window.onhashchange = () => {
  globals.Router.match();
};