var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
	seedDB      = require("./seeds");

seedDB();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// SCHEMA SETUP
var Campground = require("./models/campground");
var Commment = require("./models/comment");

//Routes    

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
			console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ========================================================

// Commments Routes

// ========================================================

app.get("/campgrounds/:id/comments/new", function(req, res) {
	
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("comments/new", {campground: foundCampground});
		}
	});
	
});


app.post("/campgrounds/:id/comments", function(req, res) {
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

app.listen(3000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});

