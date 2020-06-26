const auth = require("./authentication");
const bookings = require("./bookings");

module.exports = {
  authRouter: auth,
  bookingsRouter: bookings
}