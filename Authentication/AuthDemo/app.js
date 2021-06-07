var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

var User = require("./models/user");

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=============================
//ROUTES
//=============================



app.get("/", function(req, res) {
	res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
	res.render("secret");
});

//Auth routes

//Show sign up form
app.get("/register", function(req, res) {
	res.render('register');
});

//Handling user sign up
app.post("/register", function(req, res) {
	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			res.render('register');
		}
		else {
			passport.authenticate("local")(req, res, function() {
				res.redirect("/secret");
			});
		}
	});
});

//LOGIN ROUTES

//render login form
app.get("/login", function(req, res) {
	res.render('login');
});

//login logic
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res) {

});

//Logout

app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, process.env.IP, function() {
	console.log("Server Has Started....");
});