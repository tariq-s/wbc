var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest", 
		image: "https://q-cf.bstatic.com/images/hotel/max1024x768/206/206552599.jpg",
		description: "blah blah blah blah blah"
	},
	{
		name: "Desert Mesa", 
		image: "https://r-cf.bstatic.com/images/hotel/max1024x768/205/205603142.jpg",
		description: "blah blah blah blah blah"
	},
	{
		name: "Canyon Floor", 
		image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Wilderness_Adventure_Camps.jpg",
		description: "blah blah blah blah blah"
	}
];

function seedDB(){
	// remove campgrounds
	Campground.deleteMany({}, function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("Removed Campgrounds");
			data.forEach(function(seed) {
				Campground.create(seed, function(err, campground) {
					if (err) {
						console.log(err);
					}
					else {
						console.log("Added Campground");
						Comment.create({
							text: "This place is great, but i wish there was internet",
							author: "Homer"
						}, function(err, comment) {
							if(err) {
								console.log(err);
							}
							else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created Comment");
							}
						});
					}
				});
			});
		}
	});
	
}

module.exports = seedDB;