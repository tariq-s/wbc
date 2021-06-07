var express = require("express");
var app = express();
var bodyParser = require("body-parser");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
	{
		name: "Salmon Creek", 
		image: "https://q-cf.bstatic.com/images/hotel/max1024x768/206/206552599.jpg"
	}, function(err, campground) {
	if(err) {
		console.log("Something went wrong");
	}
	else {
		console.log("We saved a Campground to the db");
		console.log(campground);
	}
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creek", image: "https://q-cf.bstatic.com/images/hotel/max1024x768/206/206552599.jpg"},
		{name: "Granite Hill", image: "https://media-cdn.tripadvisor.com/media/photo-s/17/e2/26/2a/hip-trip-baspa-river.jpg"},
		{name: "Mountain Goat's rest", image: "https://www.chopta.in/wp-content/uploads/2020/02/swiss-camp-in-chopta.jpg"},
		{name: "Salmon Creek", image: "https://q-cf.bstatic.com/images/hotel/max1024x768/206/206552599.jpg"},
		{name: "Granite Hill", image: "https://media-cdn.tripadvisor.com/media/photo-s/17/e2/26/2a/hip-trip-baspa-river.jpg"},
		{name: "Mountain Goat's rest", image: "https://www.chopta.in/wp-content/uploads/2020/02/swiss-camp-in-chopta.jpg"}
	];

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

app.listen(3000, process.env.IP, function() {
	console.log("YelpCamp Server v2 has started");
});