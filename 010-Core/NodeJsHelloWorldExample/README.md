# NodeJs Hello World Example - http 

Command to run this example

```
node NodeJsHelloWorld.js
```

## HTTP Module
NodeJs provide http interface for http protocal support. 
```
var http = require("http");
```
In this example, it would require the http interface from NodeJs and then use it to create HTTP Server on port 8080. The server would reponse "Hello World" to all request. 

Sample Code
```
var http = require("http");
http.createServer(function(request, response){
 response.writeHead(200, {'Content-Type': 'text/plain'});
 response.end('Hello World\n');
}).listen(8080);
console.log("Server is running on http://localhost:8080/");
```

