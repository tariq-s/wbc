var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperment: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the database

// var george = new Cat({
// 	name: "George",
// 	age: 11,
// 	temperment: "Grouchy"
// });

// george.save(function(err, cat) {
// 	if(err) {
// 		console.log("Something went wrong");
// 	}
// 	else {
// 		console.log("We saved a cat to the db");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Snow White",
	age: 9,
	temperment: "Bland"
}, function(err, cat) {
	if(err) {
		console.log("Something went wrong");
	}
	else {
		console.log("We saved a cat to the db");
		console.log(cat);
	}
});

Cat.find({}, function(err, cats) {
	
	if(err) {
		console.log("Oh no error");
	}
	else {
		console.log("Here are all the cats");
		console.log(cats);
	}
});