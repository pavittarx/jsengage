// It creates a connection with MongoDB database
const mongoose = require("mongoose");
const config = require("dotenv").config();

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  process.env.MONGO_DATASOURCE || config.MONGO_DATASOURCE,
  mongooseOptions
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Wohoo!! Connection Success.");
}).on("error", (err) => {
  console.log("Some error occured \n", err);
});

module.exports = mongoose;
