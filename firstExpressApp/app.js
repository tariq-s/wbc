var express = require("express");
var app = express();

app.get("/", function(req, res) {
	console.log("someone made a request to /")
	res.send("Hi there!");
});

app.get("/bye", function(req, res) {
	res.send("Goodbye.");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
	console.log(req.params);
	var head = req.params.title.toUpperCase();
	res.send("Welcome to the " + head + " Comments page.");
});

app.get("*", function(req, res) {
	res.send("This is a star");
});

app.listen(3000, process.env.IP, function() {
	console.log("Server has started");
});