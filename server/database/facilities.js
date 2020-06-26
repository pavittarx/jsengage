const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  type: String,
  slot: Number,
  by: String
});