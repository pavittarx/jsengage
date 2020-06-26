const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  type: String,
  booked: [{
    slot: Date,
    by: String
  }]
});