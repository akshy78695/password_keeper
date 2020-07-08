const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre("save", async function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();
    // hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

module.exports = mongoose.model("user", UserSchema);
