var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Hi there! Welcome to my assignment");
});

app.get("/speak/:animal", function(req, res) {
	var animal =  req.params.animal;
	var sound = "";
	if (animal === "cat") {
		sound = "Meow";
	}
	else if (animal === "cow"){
		sound = "Moo";
	}
	else if (animal === "dog") {
		sound = "Woof";
	}
	res.send("the " + animal + " says " + sound );
});

app.get("/repeat/:text/:times", function(req, res) {
	var text = req.params.text;
	var times = Number(req.params.times);
	var send = ""
	for (var i = 0; i < times; ++i) {
		send += text + " ";
	}
	res.send(send);
});

app.get("*", function(req, res) {
	res.send("Sorry");
});

app.listen(3000, process.env.IP, function() {
	console.log("Server has started");
});