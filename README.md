# PU-JS-In-Depth

## Task Links

1. __uni-js-hello-world__ / __projectjs-event-organizer__
    * Task - http://js.mihail-petrov.me/projects/project_1.pdf
1. __projectjs-dom-calendar__
    * Task - http://js.mihail-petrov.me/projects/project_2.pdf
1. __projectjs-board-game__
    * Task - http://js.mihail-petrov.me/projects/project_3.pdf

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

## Testing for Task #2 (_projectjs-dom-calendar_)

The JavaScript file _app.js_ is used only for predefined testing of the jsDOM library, so there won't be need for 
additional code writing for the person testing this. The HTML file _index.html_ contains initial markup, so the library
can be tested there.

Calendar is located in _calendar.html_. The initial value for it will be set to the current month. If the current month
and year are selected, the current day of the month will be with a different background color. When you click on a date,
you will get additional info about events for this date. You can change the view mode to "week", than you will have the
option to move across different weeks, instead of months. If you focus on the input date picker field and after that you
click on a day, the date will be inputted as a value of the field.

## Testing for Task #3 (_projectjs-board-game_)

The only thing you need to start the game is call __globals.gameManager.initGame()__. From then on the program handles
everything. The app is separated mainly into two types of files - managers and entities. Managers are responsible for
handling the game dynamics and visual representation. Entities are classes, which describe the different entities that
exist on the board. All the information is stored in a global object called __globals__. This object is used to easily
pass information between different managers and models.

The game requires three JSON files in order to be properly configured and cannot work without them. Those are
__board.json__, which contains settings about the dimensions of the board and different configuration about it,
__game.json__, which contains player information and general game data, and __stats.json__, which contains information
about the stats that playable entities have.

Game will automatically redraw itself if window is resized, keeping everything responsive. But the game does not support
devices, which have width below 1100px.

__Player One__ is the player on the down side of the field, __Player Two__ is the one on the top of the field. In every
game __Player One__ always starts first. All the rules and game specification are contained in the task description.
There is one addition to those rules: if a player heals and then the rngManager decides that he can play one more turn
and then the player heals again, the chance for him having another (third) turn is zero, not 50% like the first time.

Game is build by using canvas. A total of four canvases are used to build the full game. This is done like that because
of speed and code optimization. It is easier to maintain many different canvases, than just one, because there is no
option to use z-index in a canvas. The four canvases are: field (contains the board), player field (contains the borders
of the players' tiles), selections (visualizes the possible tiles when performing an action) and entities (displays the
different entities that are on the board).
