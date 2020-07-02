const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({ meg: "password keeper" });
});

app.use("/api/users", require("./routes/users.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/pass", require("./routes/passwords.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
