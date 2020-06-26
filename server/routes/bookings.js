const router = require("express").Router();
const moment = require("moment");
const { Facilities } = require("./../database/index");

const facilitiesList = [
  "Badminton Court",
  "Tennis Court",
  "Gym",
  "Club House",
  "Cycle Tracks",
];

router.post("/bookings/slots", async (req, res) => {
  const params = req.body;

  if (!params.type || !params.date) {
    res.status(422).send("Please provide both Type & Date of the Service");
    return;
  }

  // Booking Starts at 6Am & ends at 7PM
  const startDate = moment(params.date).unix() + 6 * 3600;
  const endDate = startDate + 19 * 3600;

  const slots = await Facilities.find({
    type: facilitiesList[params.type],
    slot: { $gte: startDate, $lte: endDate },
  });

  if(!slots.length){
    res.send([]);
    return;
  }

  const filledSlots = slots.map(s => s.slot);
  res.send(filledSlots);
});

router.get("/bookings", (req, res) => {
  console.log("Inside Bookings", req.params);
  res.send(facilitiesList);
  return;
});

module.exports = router;
