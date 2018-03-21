/**
* NodeJs Hello World Example 

* NodeJS is JavaScript platform built on Google Chrome V8 Engine.
* It is used to develop I/O intensive web application such as video streaming sites, sigle-page application.
* 
* This example is to demonstrate how NodeJs create a HTTP Server and reponse Hello World to any all request.
* 
*/

var http = require("http");
http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello World\n');
}).listen(8080);

console.log("Server is running on http://localhost:8080/");
