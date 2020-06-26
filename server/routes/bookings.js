const router = require("express").Router();

const facilitiesList = [
  "Badminton Court",
  "Tennis Court",
  "Gym",
  "Club House",
  "Cycle Tracks",
];

router.get("/bookings", (req, res) => {
  console.log("Inside Bookings" );
  res.send(facilitiesList);
  return;
});

module.exports = router;
