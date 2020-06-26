const jwt = require("jsonwebtoken");
const User = require("./../database/index").User;

module.exports = async (req, res, next) => {
  if (req.params.route === "bookings") {
    const token = req.headers.cookie.split("=")[1];

    if (!token) {
      res.status(401).send("The user is not logged in.");
      return;
    }

    const tokenData = await jwt.decode(token);
    const userData = await User.find({ _id: tokenData.id });

    if (!userData.length) {
      res.status(401).send("The user needs to be logged in.");
      return;
    }

    const user = await jwt.verify(token, userData[0].password);

    if (!user) {
      res
        .status(401)
        .send(
          "Your sessions seems to have been expired. Please Log in to continue."
        );
        return;
    }

    console.log(user);
    next();
  }
  next();
};
