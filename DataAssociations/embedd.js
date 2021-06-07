var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo");


//POST - title, comment

var postSchema = new mongoose.Schema({
	title: String,
	comment: String
});

var Post = mongoose.model("Post", postSchema);

//USER - email, name

var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



// var newUser = new User({
// 	email: "hermione@robert.edu",
// 	name: "Hermione Robert"
// });

// newUser.posts.push({
// 	title: "How to bre polyjuice portion",
// 	comment: "just kidding. Go to portions class"
// });

// newUser.save(function(err, user){
// 	if (err) {
// 		console.log(err);
// 	}
// 	else {
// 		console.log(user);
// 	}
// });


// var newPost = Post({
// 	title:"Reflections on Apples",
// 	comment: "They are Delicious."
// });

// newPost.save(function(err, post) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	else {
// 		console.log(post);
// 	}
// });


User.findOne({name: "Hermione Robert"}, function(err, user) {
	if (err) {
		console.log(err);
	} 
	else {
		user.posts.push({
			title: "3 things i really hate",
			comment: "Voldemort. Voldemort. Voldemort."
		});
		
		user.save(function(err, post) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(post);
			}
		});
	}
});