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
              <th class="col-5">Path Visited</th>
              <th class="col-5">Date / Time</th>
            </tr>
          </thead>
          <tbody>
      `);

    for (const index in data) {
      const url = new URL(window.location.origin + data[index].path);
      markup += (`
          <tr class="d-flex">
            <td class="col-2">#${Number(index) + 1}</td>
            <td class="col-5"><a class="history-link" data-route="${url.hash.slice(1)}" data-path="${url.pathname + url.search}" href="${data[index].path}">${data[index].path}</a></td>
            <td class="col-5">${data[index].date}</td>
          </tr>
        `);
    }

    markup += (`
          </tbody>
        </table>
      `);

    globals.Router.render ({
      markup: markup,
      callback: function () {
        selectDOM('a.history-link').on('click', function (e) {
          e.preventDefault();
          globals.Router.changeRoute(e.target.getAttribute('data-route'), e.target.getAttribute('data-path'));
        });
      }
    });
  };

  build(globals.history);
});
