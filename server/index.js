const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const compression = require("compression");

const { logger, auth } = require("./middlewares/index");


// Express Configuration Middlewares
app
  .use(compression())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors());

// Project Specific Middlewares
app.use(logger).use("/api/:route", auth);

// Binds React App with Express Server
app.use(express.static(path.join(__dirname, "..", "build")));

// Router Configuration
const authRouter = require("./routes/authentication");
app.use("/api", authRouter);

app.listen(process.env.PORT || 3000);
