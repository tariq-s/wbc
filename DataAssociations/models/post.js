var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	title: String,
	comment: String
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;