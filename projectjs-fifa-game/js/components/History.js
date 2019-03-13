/**
 * Registers a route for site visitations history. Visualizes each action taken by the user.
 * It uses cookies for storage.
 */
globals.Router.register('/history', 'History', function (searchParams) {
  const build = (data = null) => {
    let markup = '';

    markup += (`
        <div class="container d-flex justify-content-center">
          <button type="button" class="btn btn-danger mb-4" onclick="globals.Cookie.deleteCookie(globals.history_cookie_key)">Delete History</button>
        </div>        
        <table class="table table-bordered">
          <thead>
            <tr class="d-flex">
              <th class="col-2">Action Order Number</th>
              <th class="col-6">Path Visited</th>        
              <th class="col-6">Date / Time</th>                          
            </tr>
          </thead>
          <tbody>
      `);

    for (const index in data) {
      markup += (`
          <tr class="d-flex">
            <td class="col-2">#${Number(index) + 1}</td>
            <td class="col-6"><a href="${data[index].path}">${data[index].path}</a></td>
            <td class="col-6">${data[index].date}</td>
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

  build(globals.history);
});
