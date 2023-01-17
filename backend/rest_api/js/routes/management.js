const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../pool.js');

const router = express.Router();
router.use(bodyParser.json());

// create a new theatre
// OK
// TODO: create trigger to update table seats
const insertTheatreText =
    `
    INSERT INTO theatres(name, seats, is_dolby, is_3d, is_4d)
    VALUES ($1, $2, $3, $4, $5);
    `;
router.post("/theatres", (req, res) => {
    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (body.name === undefined || body.seats === undefined || body.is_dolby === undefined
        || body.is_3d === undefined || body.is_4d === undefined) {
        res.status(400).send('Bad Request');
        return;
    }

    pool.query(insertTheatreText, [body.name, body.seats, body.is_dolby, body.is_3d, body.is_4d])
        .then(value => {
            // normally resource link gets appended to resp.-body
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
});

// update an existing theatre (updating seats isn't possible)
// OK
const updateTheatreText =
    `
    UPDATE theatres
    SET name = $2,
    is_dolby = $3,
    is_3d = $4,
    is_4d = $5
    WHERE theatre_id = $1;
    `;
router.put("/theatres/:theatreID", (req, res) => {
    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (body.name === undefined || body.is_dolby === undefined
        || body.is_3d === undefined || body.is_4d === undefined) {
        res.status(400).send('Bad Request');
        return;
    }

    pool.query(updateTheatreText, [req.params.theatreID, body.name, body.is_dolby, body.is_3d, body.is_4d])
        .then(value => {
            // normally resource link gets appended to resp.-body
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
});

// delete an existing theatre
// OK
const deleteTheatreText =
    `
    DELETE FROM theatres
    WHERE theatre_id = $1;
    `;
router.delete("/theatres/:theatreID", (req, res) => {
    pool.query(deleteTheatreText, [req.params.theatreID])
        .then(value => {
            res.status(204).send('No Content');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// create a new movie
// OK
const insertMovieText =
    `
    INSERT INTO movies (name, description, duration, age)
    VALUES ($1, $2, $3, $4);
    `;
router.post("/movies", (req, res) => {
    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (body.name === undefined || body.description === undefined
        || body.duration === undefined || body.age === undefined) {
        res.status(400).send('Bad Request');
        return;
    }

    pool.query(insertMovieText, [body.name, body.description, body.duration, body.age])
        .then(value => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// update an existing movie
// OK
const updateMovieText =
    `
    UPDATE movies
    SET name = $2,
    description = $3,
    duration = $4,
    age = $5
    WHERE movie_id = $1;
    `;
router.put("/movies/:movieID", (req, res) => {
    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (body.name === undefined || body.description === undefined
        || body.duration === undefined || body.age === undefined) {
        res.status(400).send('Bad Request');
        return;
    }

    pool.query(updateMovieText, [req.params.movieID, body.name, body.description, body.duration, body.age])
        .then(value => {
            // normally resource link gets appended to resp.-body
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
});

// delete an existing movie (movie gets also deleted from schedules and tickets!)
// OK
const deleteMovieText =
    `
    DELETE FROM movies 
    WHERE movie_id = $1;
    `;
router.delete("/movies/:movieID", (req, res) => {
    pool.query(deleteMovieText, [req.params.movieID])
        .then(value => {
            res.status(204).send('No Content');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// create a new schedule entry
// OK
const insertScheduleText =
    `
    INSERT INTO schedules (movie_id, theatre_id, date, time)
    VALUES ($1, $2, $3, $4);
    `;
router.post("/schedules", (req, res) => {
    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (body.movie_id === undefined || body.theatre_id === undefined
        || body.date === undefined || body.time === undefined) {
        res.status(400).send('Bad Request');
        return;
    }

    pool.query(insertScheduleText, [body.movie_id, body.theatre_id, body.date, body.time])
        .then(value => {
            // normally resource link gets appended to resp.-body
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// update an existing schedule entry
// OK
const updateScheduleText =
    `
    UPDATE schedules
    SET movie_id = $2,
    theatre_id = $3,
    date = $4,
    time = $5
    WHERE schedule_id = $1;
    `;
router.put("/schedules/:scheduleID", (req, res) => {
    let body = req.body;  // specify 'content-type= application/json' when sending POST req!
    if (body.movie_id === undefined || body.theatre_id === undefined
        || body.date === undefined || body.time === undefined) {
        res.status(400).send('Bad Request');
        return;
    }

    pool.query(updateScheduleText, [req.params.scheduleID, body.movie_id, body.theatre_id, body.date, body.time])
        .then(value => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
});

// delete an existing schedule entry
// OK
const deleteScheduleText =
    `
    DELETE FROM schedules
    WHERE schedule_id = $1;
    `;
router.delete("/schedules/:scheduleID", (req, res) => {
    pool.query(deleteScheduleText, [req.params.scheduleID])
        .then(value => {
            res.status(204).send('No Content');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;
