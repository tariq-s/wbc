var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

//APP Config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful_blog_app");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
//MONGOOSE MODEL
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "test blog",
// 	image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
// 	body: "This is a blog post"
// });

//RESTful Routes

app.get("/", function(req, res) {
	res.redirect("/blogs");
});

//Index route
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log("ERROR");
		}
		else {
			res.render("index", {blogs: blogs});
		}
	});
});

//New Route
app.get("/blogs/new", function(req, res) {
	res.render("new");
});

//CREATE Route
app.post("/blogs", function(req, res) {
	Blog.create(req.body.blog, function(err, newBlog) {
		if(err) {
			res.render("new");
		}
		else {
			res.redirect("/blogs");
		}
	});
});

//SHOW route
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		}
		else {
			res.render("show", {blog: foundBlog});
		}
	});
});

//EDIT Route

app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		}
		else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

//UPDATE Route

app.put("/blogs/:id", function(req, res) {
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err) {
			res.redirect("/blogs");
		}
		else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//DELETE Route

app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect("/blogs");
		}
		else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, process.env.IP, function() {
	console.log("Server is running");
});