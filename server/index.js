const express = require("express");
const path = require("path");

const app = express();
const compression = require("compression");

app.use(compression()).use(express.urlencoded({ extended: true }));
// Binds React App with Express Server
app.use(express.static(path.join(__dirname, "..", "build")));

const authRouter = require("./routes/authentication");
app.use("/api", authRouter);

app.listen(process.env.PORT || 3000);
