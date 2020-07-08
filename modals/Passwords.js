const mongoose = require("mongoose");

const PasswordSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("password", PasswordSchema);
