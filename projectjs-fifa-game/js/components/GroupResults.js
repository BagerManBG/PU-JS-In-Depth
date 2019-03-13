/**
 * Registers a route for team group results. Visualizes data about countries sorted by their group code.
 */
globals.Router.register('/teams/group-results', 'Group Results', function (searchParams) {
  const build = (data = null) => {
    let markup = '';

    markup += (`
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Group Letter</th>
              <th>Country</th>
              <th>Games Played</th>          
              <th>Wins</th>          
              <th>Draws</th>          
              <th>Losses</th>          
              <th>Points</th>          
              <th>Goals For</th>          
              <th>Goals Against</th>          
              <th>Goal Differential</th>          
            </tr>
          </thead>
          <tbody>
      `);

    for (const group_index in data) {
      for (const teams_index in data[group_index]['ordered_teams']) {
        const team = data[group_index]['ordered_teams'][teams_index];

        markup += (`
          <tr>
            <td>${data[group_index]['letter']}</td>
            <td>${team['country']}</td>
            <td>${team['games_played']}</td>
            <td>${team['wins']}</td>
            <td>${team['draws']}</td>
            <td>${team['losses']}</td>
            <td>${team['points']}</td>
            <td>${team['goals_for']}</td>
            <td>${team['goals_against']}</td>
            <td>${team['goal_differential']}</td>
          </tr>
        `);
      }
    }

    markup += (`
          </tbody>
        </table>
      `);

    globals.Router.render ({
      markup: markup,
    });
  };

  globals.MusAJAX.get(globals.endpoints.teams_group_results, build);
});
