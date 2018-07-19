// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var comments = require('./Comments.js');
var News = require('./newsModel.js');
var PORT = 8889;

mongoose.Promise = Promise;
// Init

app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json 
app.use(bodyParser.json())
app.use(express.static("public"));
if(process.env.NODE_ENV==="production"){
  mongoose.connect(process.env.MONGODB_URI);
} else  {
  mongoose.connect("mongodb://localhost/newsScraper");
};

var db = mongoose.connection;
// va
var databaseUrl = "zoo";
var collections = ["animals"];
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});
db.once('open', function () {
  console.log("Mongoose connection successful");
})
// Routes
app.get("/", function(req, res) {
  res.send("Hello furry friends");
});
app.get("/all", function(req, res) {
  // find all
  db.animals.find({}, function(error, found) {
    // tell me if error
    if (error) {
      console.log(error);
    }
    // else, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 3. At the "/name" path, display every entry in the animals collection, sorted by name
app.get("/name", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by name (1 means ascending order)
  db.animals.find().sort({ name: 1 }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 4. At the "/weight" path, display every entry in the animals collection, sorted by weight
app.get("/weight", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
  db.animals.find().sort({ weight: -1 }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
