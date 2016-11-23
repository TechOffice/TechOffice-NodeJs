1. create express project
```
npm init
npm install express --save
npm install socket.io --save
```

2. create app.js
app.js
```
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
	socket.on("chat message", function(msg){
		io.emit("chat message", msg);
	});
});

http.listen(3000, function(){
	console.log("listening on *:3000");
});
```

3. install javascript library through bower_components
```
bower init 
bower install jquery --save
bower install socket.io-client --save
```

4. create index.html
```
<html>
	<head>
		<script src="/bower_components/jquery/dist/jquery.min.js"></script>
		<script src="/bower_components/socket.io-client/socket.io.js"></script>
	</head>
	<body>
		<ul id="messages"></ul>
		<form>
			<input id="m" autocomplete="off"/><button>Send</button>
		</form>
		<script>
			var socket = io();
			$('form').submit(function(){
				socket.emit('chat message', $("#m").val());
				$("#m").val("");
				return false;
			});
			socket.on("chat message", function(msg){
				$("#messages").append($("<li>").text(msg));
			});
		</script>
	</body>
</html>
```

5. start application and visit web page, http://localhost:3000
```
node app.js
```
