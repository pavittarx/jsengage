const router = require("express").Router();
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { Facilities } = require("./../database/index");

const facilitiesList = [
  "Badminton Court",
  "Tennis Court",
  "Gym",
  "Club House",
  "Cycle Tracks",
];

router.post("/bookings/book", async (req, res) => {
  const params = req.body;

  if (!params.type || !params.slot) {
    res.status(422).send("Please provide both time and slot of service.");
    return;
  }

  const slotExists = await Facilities.find({
    type: facilitiesList[params.type],
    slot: params.slot,
  });

  console.log("Slot Exists: ", slotExists);

  if (slotExists.length) {
    res.status(401).send("The requested slot is pre-occupied");
    return;
  }

  const token = req.headers.cookie.split("=")[1];
  const user = jwt.decode(token);

  const facility = new Facilities({
    type: facilitiesList[params.type],
    slot: params.slot,
    by: user.id,
  });

  const booking = await facility.save();

  res.send("The slot has successfully been booked.");
});

router.post("/bookings/slots", async (req, res) => {
  const params = req.body;

  if (!params.type || !params.date) {
    res.status(422).send("Please provide both Type & Date of the Service");
    return;
  }

  // Booking Starts at 6Am & ends at 7PM
  const start = moment(params.date).valueOf() + 7 * 3600000;
  const end = start + 21 * 3600000;

  console.log("Slots: ", start, end);

  const slots = await Facilities.find({
    type: facilitiesList[params.type],
    slot: { $gte: start, $lte: end },
  });

  console.log("Filled Slots", slots);

  if (!slots.length) {
    res.send([]);
    return;
  }

  const filledSlots = slots.map((s) => s.slot);
  res.send(filledSlots);
});

router.get("/bookings", (req, res) => {
  console.log("Inside Bookings", req.params);
  res.send(facilitiesList);
  return;
});

module.exports = router;
