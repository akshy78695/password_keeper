const express = require("express");
const { check, validationResult } = require("express-validator");

const User = require("../modals/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

const config = require("config");

// @route       POST /api/users
// @desc        Register user
// @access      public

router.post(
    "/",
    [
        check("name", "Please enter name").not().isEmpty(),
        check("email", "Please enter valid email").isEmail(),
        check("password", "Password at least 6 char").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    message: "User already exist",
                });
            }

            user = new User({
                name,
                email,
                password,
            });
            await user.save();

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
            console.error(error.message);
        }
    }
);

module.exports = router;
