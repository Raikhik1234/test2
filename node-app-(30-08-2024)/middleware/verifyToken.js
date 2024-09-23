var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.headers.authorization)
    let token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        console.log(err, user)
        if (err) {
            res.status(401).send({
                data: {},
                message: "Session expired"
            });
        }
        req.user = user
        next();
    })
}