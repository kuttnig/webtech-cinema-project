let cfg = require('./config.json');
const pool = require('./pool.js');  // the database pool
const { response } = require('express');

let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

const app = express();
app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(bodyParser.json()); // support json encoded bodies

// ################
// ### CUSTOMER ###
// ################

// retrieve a list of all movies available
app.get("/movies", (req, res) => {
    // TODO
});

// retrieve details for a movie
app.get("/movies/details/:movieID", (req, res) => {
    // TODO
});

// retrieve reviews and ratings for a movie
app.get("/movies/reviews/:movieID", (req, res) => {
    // TODO
});

// retrieve the schedule for a movie
app.get("/movies/schedules/:movieID", (req, res) => {
    // TODO
});

// check which seats are available for a scheduled movie
app.get("/movies/schedules/seats/:scheduleID", (req, res) => {
    // TODO
});

// buy a ticket for a movie
app.post("/tickets", (req, res) => {
    // TODO
});

// return a ticket for a movie
app.delete("/tickets/:ticketID", (req, res) => {
    // TODO
});

// rate and review a movie
app.post("/movies/reviews", (req, res) => {
    // TODO
});

// ##################
// ### MANAGEMENT ###
// ##################

// create a new theatre
app.post("/theatres", (req, res) => {
    // TODO
});

// update an existing theatre
app.put("/theatres/:theatreID", (req, res) => {
    // TODO
});

// delete an existing theatre
app.delete("/theatres/:theatreID", (req, res) => {
    // TODO
});

// create a new movie
app.post("/movies", (req, res) => {
    // TODO
});

// update an existing movie
app.put("/movies/:movieID", (req, res) => {
    // TODO
});

// delete an existing movie
app.delete("/movies/:movieID", (req, res) => {
    // TODO
});

// create a new schedule entry
app.post("/schedules", (req, res) => {
    // TODO
});

// update an existing schedule entry
app.put("/schedules/:scheduleID", (req, res) => {
    // TODO
});

// delete an existing schedule entry
app.delete("/schedules/:scheduleID", (req, res) => {
    // TODO
});

// start listening on localhost:3000
let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
