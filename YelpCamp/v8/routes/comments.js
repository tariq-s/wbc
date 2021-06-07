var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


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
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				}
				else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save the comment
					comment.save();
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