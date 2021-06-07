var request = require("request");
request("http://www.google.com", function(error, response, body) {
	if (error) {
		console.log("Something went wrong");
		console.log(error);
	}
	else {
		if (response.statusCode === 200) {
			//things worked
			console.log(body);
		}
	}
});