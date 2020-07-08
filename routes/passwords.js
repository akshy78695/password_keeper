const express = require("express");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../modals/User");
const Passwords = require("../modals/Passwords");

const router = express.Router();

// @route       GET /api/pass
// @desc        Get all user password/s
// @access      private

router.get("/", auth, async (req, res) => {
    try {
        const passwords = await Passwords.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.send(passwords);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route       POST /api/pass
// @desc        add password/s
// @access      private

router.post(
    "/",
    [
        auth,
        [check("name", "Name required").not().isEmpty()],
        check("password", "Password required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, password, description } = req.body;
        try {
            const newPassword = new Passwords({
                name,
                password,
                description,
                user: req.user.id,
            });
            const resPassword = await newPassword.save();
            res.json(resPassword);
        } catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }
    }
);
// @route       PUT /api/pass
// @desc        update password/s
// @access      private

router.put("/:id", (req, res) => {
    res.send("update password");
});

// @route       DELETE /api/pass
// @desc        delete password/s
// @access      private

router.delete("/:id", (req, res) => {
    res.send("delete password");
});

module.exports = router;
