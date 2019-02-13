# PU-JS-In-Depth

## Task Links

1. __uni-js-hello-world__ / __projectjs-event-organizer__
    * Task - http://js.mihail-petrov.me/projects/project_1.pdf
1. __projectjs-dom-calendar__
    * Task - http://js.mihail-petrov.me/projects/project_2.pdf
## Running the Projects

Running a project is advised to be through a local web server with CORS enabled. Preferred method would be through a
NodeJS server. Easiest way is by downloading the _http-server_ module for NodeJS globally. After that, just enter the
root directory of the project you want using a terminal and type the following command.
````bash
http-server -a localhost -p 8080 --cors
````
After that the files will be statically served by the NodeJS server and you can view the project by visiting 
[localhost:8080](http://localhost.8080).

All projects are purely Front-End apps and a web server is not entirely necessary to run them. But without opening them
with a web server, AJAX calls to files in the same project won't work in all browsers because of CORS. Some test 
features of the projects won't be able to run if files are loaded locally without a web server.

If you are running a project without a web server, please use Mozilla Firefox Browser, since it has higher chance of
running successful AJAX calls than Google Chrome.

## Testing for Task #1 (_projectjs-event-organizer_)

The JavaScript file _app.js_ is used only for predefined testing, so there won't be need for additional code writing for 
the person testing this. Also, starting data is provided from the JSON file _events.json_, which is then loaded by
_setup.js_, who crawls through all the data and creates the events, structured in the file.

## Testing for Task #2 (_projectjs-dom-calendar)

The JavaScript file _app.js_ is used only for predefined testing of the jsDOM library, so there won't be need for additional code writing for the person testing this. The HTML file _index.html_ contains initial markup, so the library can be tested there.

Calendar is located in _calendar.html_. The initial value for it will be set to the current month. If the current month and year are selected, the current day of the month will be with a different background color.
