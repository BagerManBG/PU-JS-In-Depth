/**
 * Registers a route for teams data. Visualizes data about each team available in the API.
 */
globals.Router.register('/teams', 'Teams', function (searchParams) {
  const build = () => {
    let markup = '';

    markup += (`
        <table class="table table-bordered">
          <thead>
            <tr class="d-flex">
              <th class="col-4">Country</th>
              <th class="col-4">FIFA Code</th>
              <th class="col-4">Group Letter</th>          
            </tr>
          </thead>
          <tbody>
      `);

    for (const country_code in globals.countries) {
      markup += (`
          <tr class="d-flex">
            <td class="col-4">${globals.countries[country_code]['country']}</td>
            <td class="col-4">${globals.countries[country_code]['fifa_code']}</td>
            <td class="col-4">${globals.countries[country_code]['group_letter']}</td>
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

  !Boolean(globals.countries) ? globals.functions.getCountries(build) : build();
});
