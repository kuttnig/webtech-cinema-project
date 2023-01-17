let cfg = require('../../config.json');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.get('Authorization');
        let payload = jwt.verify(token, cfg.auth.jwt_key); // throws exception if secret or exp.-date is not valid (we can ignore the payload)

        if (!payload.admin) {
            throw new Error('Not allowed!');
        }

        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
};
