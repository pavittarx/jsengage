const mongoose = require("mongoose");

const facilitiesSchema = new mongoose.Schema({
  type: String,
  booked: [{
    slot: Date,
    by: String
  }]
})

module.exports = mongoose.model=("Facilities", facilitiesSchema);