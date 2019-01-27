# PU-JS-In-Depth

## Task Links

1. __uni-js-hello-world__ / __projects-event-organizer__
    * Task - http://js.mihail-petrov.me/projects/project_1.pdf
    
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