const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../pool.js');
const authCustomer = require('../auth/auth_customer');

const router = express.Router();
router.use(bodyParser.json());

// TODO: UNCOMMENT TO ENABLE AUTHORIZATION
// router.use(authCustomer);

// retrieve a list of all movies available
// OK
const selectAllMoviesText =
    `
    SELECT movie_id, name
    FROM movies;
    `;

router.get('/movies', (req, res) => {
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
// OK
const selectMovieDetailsText =
    `
    SELECT movie_id, name, description, duration, age
    FROM movies
    WHERE movies.movie_id = $1;
    `;

router.get("/movies/details/:movieID", (req, res) => {
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
// OK
const selectMovieReviewsText =
    `
    SELECT reviews.movie_id, movies.name, reviews.username, reviews.text, reviews.stars
    FROM reviews
    JOIN movies
    ON reviews.movie_id = movies.movie_id
    WHERE reviews.movie_id = $1;
    `;

router.get("/movies/reviews/:movieID", (req, res) => {
    pool.query(selectMovieReviewsText, [req.params.movieID])
        .then(value => {
            res.status(200).json(value.rows);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
});

// retrieve the schedule for a movie (only returns movies which haven't be shown yet)
// OK
const selectMovieScheduleText =
    `
    SELECT sched.theatre_id, theatres.name, sched.schedule_id, sched.movie_id, sched.date, sched.time
    FROM (
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
    ) sched
    JOIN theatres
    ON sched.theatre_id = theatres.theatre_id;
    `;

router.get("/movies/schedules/:movieID", (req, res) => {
    pool.query(selectMovieScheduleText, [req.params.movieID])
        .then(value => {
            res.status(200).json(value.rows);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
});

// return all seats for a given theatre
// OK
const selectAllSeatsText =
    `
    SELECT seat_id, row, number FROM seats
    WHERE theatre_id = $1;
    `

router.get("/theatres/seats/:theatreID", (req, res) => {
    pool.query(selectAllSeatsText, [req.params.theatreID])
        .then(value => {
            res.status(200).json(value.rows);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});


// check which seats are available for a scheduled movie
// OK
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

router.get("/movies/schedules/seats/:scheduleID", (req, res) => {
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
// OK
// potential security risk: user can buy tickets for other user by guessing usernames
const insertTicketText =
    `
    INSERT INTO tickets(username, schedule_id, seat_id)
    VALUES($1, $2, $3);
    `;

router.post("/tickets", (req, res) => {


    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (body.username === undefined || body.schedule_id === undefined || body.seat_id === undefined) {
        res.status(400).send('Bad Request');
        return;
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
// OK
// potential security risk: user can delete tickets from other user by guessing ticket id
// TODO: ensure that only not-expired (movie wasn't shown yet) tickets can be deleted
const deleteTicketText =
    `
    DELETE FROM tickets
    WHERE ticket_id = $1;
    `;
router.delete("/tickets/:ticketID", (req, res) => {
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
// OK
// potential security risk: user can write reviews for other user by guessing usernames
// TODO: ensure that the reviewer has watched the movie
const insertReviewText =
    `
    INSERT INTO reviews (movie_id, username, text, stars)
    VALUES ($1, $2, $3, $4);
    `;
router.post("/movies/reviews", (req, res) => {
    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (body.movie_id === undefined || body.username === undefined ||
        body.text === undefined || body.stars === undefined) {
        res.status(400).send('Bad Request');
        return;
    }

    pool.query(insertReviewText, [body.movie_id, body.username, body.text, body.stars])
        .then(value => {
            // normally resource link gets appended to resp.-body
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});


module.exports = router;
