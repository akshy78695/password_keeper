const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
    //Get token from user
    const token = req.header("x-auth-token");
    //If there's not token
    if (!token) {
        return res
            .status(401)
            .json({ message: "User unautherized, Please log-in" });
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: "invalid token" });
    }
};
