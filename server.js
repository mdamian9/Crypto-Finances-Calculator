// Require dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Set up port to be host's designated port, or 3000
let PORT = process.env.PORT || 3000;

// Instantiate Express App
const app = express();

// Designate public folder as a static directory
app.use(express.static("public"));

// User bodyParser in app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// If deployed, use the deployed database. Otherwise use the local cryptoData database
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/movie";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// Listen on the port
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});
