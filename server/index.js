const express = require("express");

const app = express();
const mongoose = require("./connect");
const compression = require("compression");

app.use(compression()).use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

const authRouter = require("./routes/authentication");
app.use("/api", authRouter);

app.listen(process.env.PORT || 3000);