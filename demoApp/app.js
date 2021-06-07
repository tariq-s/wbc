console.log("from app.js");

var catMe = require('cat-me');

var knockKnockJokes = require('knock-knock-jokes');

var Faker = require("faker");


//console.log(knockKnockJokes());

for (var i = 0; i < 10; i++) {
	console.log(Faker.commerce.productName() + " - " + Faker.commerce.price());
}
