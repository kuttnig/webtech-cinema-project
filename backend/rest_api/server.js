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
const selectAllMoviesText =
    `
    SELECT movie_id, name, description, duration, age
    FROM movies;
    `;

app.get('/movies', (req, res) => {
    pool.query(selectAllMoviesText)
        .then(value => {
            res.status(200).json(value.rows);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// retrieve details for a movie
const selectMovieDetailsText =
    `
    SELECT name, description, duration, age
    FROM movies
    WHERE movies.movie_id = $1;
    `;

app.get("/movies/details/:movieID", (req, res) => {
    pool.query(selectMovieDetailsText, [req.params.movieID])
        .then(value => {
            res.status(200).json(value.rows);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
});

// retrieve reviews and ratings for a movie
const selectMovieReviewsText =
    `
    SELECT username, text, stars
    FROM reviews WHERE reviews.movie_id = $1;
    `;

app.get("/movies/reviews/:movieID", (req, res) => {
    pool.query(selectMovieReviewsText, [req.params.movieID])
        .then(value => {
            res.status(200).json(value.rows);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
});

// retrieve the schedule for a movie
const selectMovieScheduleText =
    `
    (
    SELECT schedule_id, movie_id, theatre_id, date, time
    FROM schedules
    WHERE movie_id = $1
    AND date >= CURRENT_DATE
    )
    EXCEPT
    (
    SELECT schedule_id, movie_id, theatre_id, date, time
    FROM schedules
    WHERE movie_id = $1
    AND date = CURRENT_DATE
    AND time <= LOCALTIME(0)
    )
    `;

app.get("/movies/schedules/:movieID", (req, res) => {
    pool.query(selectMovieScheduleText, [req.params.movieID])
        .then(value => {
            res.status(200).json(value.rows);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
});

// check which seats are available for a scheduled movie
const selectAvailableSeatsText =
    `
    SELECT all_seats.seat_id, all_seats.row, all_seats.number FROM
    (
	    SELECT seats.seat_id, seats.row, seats.number, seats.theatre_id FROM seats
	    JOIN
	    (
		    SELECT schedules.theatre_id, schedules.schedule_id FROM schedules
            WHERE schedules.schedule_id = $1
	    ) theatre
	    ON
	    seats.theatre_id = theatre.theatre_id
    ) all_seats
    LEFT JOIN
    (
	    SELECT tickets.seat_id FROM tickets
        WHERE tickets.schedule_id = $1
    ) reserved_seats
    ON
    all_seats.seat_id = reserved_seats.seat_id
    WHERE reserved_seats.seat_id IS NULL;
    `;

app.get("/movies/schedules/seats/:scheduleID", (req, res) => {
    pool.query(selectAvailableSeatsText, [req.params.scheduleID])
        .then(value => {
            res.status(200).json(value.rows);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// buy a ticket for a movie
const insertTicketText =
    `
    INSERT INTO tickets(username, schedule_id, seat_id)
    VALUES($1, $2, $3);
    `;

app.post("/tickets", (req, res) => {
    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (!body.username || !body.schedule_id || !body.seat_id) {
        res.status(400).send('Bad Request');
    }

    pool.query(insertTicketText, [body.username, body.schedule_id, body.seat_id])
        .then(value => {
            // normally resource link gets appended to resp.-body
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// return a ticket for a movie
// TODO: potential security risk?
const deleteTicketText =
    `
    DELETE FROM tickets
    WHERE ticket_id = $1;
    `;
app.delete("/tickets/:ticketID", (req, res) => {
    pool.query(deleteTicketText, [req.params.ticketID])
        .then(value => {
            res.status(204).send('No Content');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// rate and review a movie
// TODO: check if user is has watched the movie
const insertReviewText =
    `
    INSERT INTO reviews (movie_id, username, text, stars)
    VALUES ($1, $2, $3, $4);
    `;
app.post("/movies/reviews", (req, res) => {
    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (!body.movie_id || !body.username || !body.text || !body.stars) {
        res.status(400).send('Bad Request');
    }

    pool.query(insertReviewText, [body.movieID, body.username, body.text, body.stars])
        .then(value => {
            // normally resource link gets appended to resp.-body
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
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

// TODO: implement HTTP-response status-code 418 I'm a teapot
