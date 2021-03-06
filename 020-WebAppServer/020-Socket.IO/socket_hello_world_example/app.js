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
		console.log(msg);
		io.emit("chat message", msg);
	});
});

http.listen(3000, function(){
	console.log("listening on *:3000");
});