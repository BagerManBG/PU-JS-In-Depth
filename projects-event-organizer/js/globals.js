const globals = {
  lawfulAge: 18,
  allowAdditions: true,
  eventListCollection: {},
  idCounter: {},
  functions: {},
  regEx: {
    date: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
  },
};

globals.functions.loadJSON = callback => {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './data/data.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
};

globals.functions.updateAdditionState = value => {
  globals.allowAdditions = Boolean(value);
};
