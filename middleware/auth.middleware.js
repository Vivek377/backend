const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const decoded = jwt.verify(token, "secret");
        if (decoded) {
            const userId = decoded.userId;
            req.body.userId = userId;
            next();
        }
    } else {
        res.status(200).send({ err: "Please Login first" });
    }
}

module.exports = auth;
