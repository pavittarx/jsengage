const mongoose = require("./../connect");

const facilitiesSchema = new mongoose.Schema({
  type: String,
  booked: [{
    slot: Date,
    by: String
  }]
})

module.exports = mongoose.model=("Facilities", facilitiesSchema);