let cfg = require('../../config.json');
const jwt = require('jsonwebtoken');

/*
this module is used for customer endpoints
the function only checks if the token is valid
the management can use customer- and management-endpoints
*/

module.exports = (req, res, next) => {
    try {
        let token = req.get('Authorization'); // extract Authorization header
        let payload = jwt.verify(token, cfg.auth.jwt_key); // throws exception if secret or exp.-date is not valid (we can ignore the payload)

        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
};
