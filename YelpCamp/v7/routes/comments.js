var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comments = require("../models/comment");


// comments new
router.get("/new", isLoggedIn, function(req, res) {
	
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("comments/new", {campground: foundCampground});
		}
	});
	
});


// comments create

router.post("/", isLoggedIn, function(req, res) {
	//look up campground using id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		}
		else {
			// create new comments
			Commment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				}
				else {
					foundCampground.comments.push(comment);
					foundCampground.save();
					res.redirect("/campgrounds/" + foundCampground._id);
				}
			});
		}
	});
});

// middle ware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}

module.exports = router;