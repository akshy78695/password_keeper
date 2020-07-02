const express = require("express");

const router = express.Router();

// @route       GET /api/auth
// @desc        get logged in user
// @access      private

router.get("/", (req, res) => {
    res.send("get logged in a user");
});

// @route       POST /api/auth
// @desc        auth user and get token
// @access      public

router.post("/", (req, res) => {
    res.send("authenticate user and give him token");
});

module.exports = router;
