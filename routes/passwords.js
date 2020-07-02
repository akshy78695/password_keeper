const express = require("express");

const router = express.Router();

// @route       GET /api/pass
// @desc        Get all user password/s
// @access      private

router.get("/", (req, res) => {
    res.send("user's all passwords");
});

// @route       POST /api/pass
// @desc        add password/s
// @access      private

router.post("/", (req, res) => {
    res.send("add password");
});
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
