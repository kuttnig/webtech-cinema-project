const cfg = require('../../config.json');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../pool.js');

const router = express.Router();
router.use(bodyParser.json());

// login for normal/admin users
const selectUserText =
    `
    SELECT is_admin FROM users
    WHERE username = $1 AND password = $2;
    `;
router.post('/login', (req, res) => {
    let body = req.body;
    if (body.username === undefined || body.password === undefined) {
        res.status(400).send('Bad Request');
        return;
    }

    pool.query(selectUserText, [body.username, body.password])
        .then(value => {
            let records = value.rows;

            // no record found
            if (records.length !== 1) {
                res.status(401).send('Unauthorized');
                return;
            }

            let token;
            if (records[0].is_admin) {
                token = jwt.sign({ admin: true }, cfg.auth.jwt_key,
                    { expiresIn: cfg.auth.expiration, issuer: body.username });
            } else {
                token = jwt.sign({ admin: false }, cfg.auth.jwt_key,
                    { expiresIn: cfg.auth.expiration, issuer: body.username });
            }
            res.status(200).json({
                username: body.username,
                token: token
            });
        }
        )
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })

});

module.exports = router;
