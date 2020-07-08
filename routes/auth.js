const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../modals/User");
const router = express.Router();

// @route       GET /api/auth
// @desc        get logged in user (loggin user who already has token)
// @access      private

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route       POST /api/auth
// @desc        auth user and get token (loggin user first time)
// @access      public

router.post(
    "/",
    [
        check("email", "Please enter valid email").isEmail(),
        check("password", "Password required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            //finding user
            if (!user)
                return res.status(400).json({ message: "Invalid credentials" });
            //matching passcode
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            //if User found
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 3600,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token: token });
                }
            );
        } catch (error) {
            console.error(error);
            res.send(500).send("500 server error");
        }
    }
);

module.exports = router;
