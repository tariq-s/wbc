var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var indexRoutes = require("./routes/index"),
	campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes = require("./routes/comments");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app");


app.use(require("express-session")({
	secret: "Anything but predictable",
	resave: false,
	saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

var User = require("./models/user"),
	Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
	seedDB      = require("./seeds");

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

seedDB();

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


//=============================
//ROUTES
//=============================


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, process.env.IP, function() {
	console.log("Server Has Started....");
});