globals.Router.register('/teams', 'Teams', function (searchParams) {
  globals.elements.title.text('Teams');

  const build = () => {
    let markup = '';

    markup += (`
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Country</th>
              <th>FIFA Code</th>
              <th>Group Letter</th>          
            </tr>
          </thead>
          <tbody>
      `);

    for (const country_code in globals.countries) {
      markup += (`
          <tr>
            <td>${globals.countries[country_code]['country']}</td>
            <td>${globals.countries[country_code]['fifa_code']}</td>
            <td>${globals.countries[country_code]['group_letter']}</td>
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

  !Boolean(globals.countries) ? globals.getCountries(build) : build();
});
