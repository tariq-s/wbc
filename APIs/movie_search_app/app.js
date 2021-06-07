var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("search");
});

app.get("/results", function(req, res) {
	var query = req.query.search;
	request("http://www.omdbapi.com/?s="+ query + "&apikey=thewdb", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var results = JSON.parse(body)
			res.render("results", {results: results});
		}
	});
});

app.listen(3000, process.env.IP, function() {
	console.log("Movie app has started");
});