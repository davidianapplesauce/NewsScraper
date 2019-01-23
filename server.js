// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// Set up the port
var PORT = process.env.PORT || 3000;

// Instantiate the Express app
var app = express();

// Set up the Express router
var router = express.Router();
require("./config/routes")(router);

// designate public folder
app.use(express.static(__dirname + "/public"));

// connet Handlebars to the Express app
app.engine("handlebars", expressHandlebars({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// use BodyParser in the app
app.use(bodyParser.urlencoded({
	extended: false
}));

// send requests through router
app.use(router);

// set up database
var db = process.env.MONGODB_URI || "mongodb://localhost/newsarticles";

mongoose.connect(db, function(error) {
	if (error) {
		console.log(error);
	} else {
		console.log("mongoose connection is sucessful");
	}
});

// listen to the port
app.listen(PORT, function() {
	console.log("Listening on port: " + PORT);
});