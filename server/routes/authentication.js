const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./../models/user");

router.post("/signup", async (req, res) => {
  const userParams = req.body;
  // checks if the provided fields are not empty
  if (!userParams.name || !userParams.email || !userParams.password) {
    res.status(401).send("One or more fields required for signup are empty");
  }

  // checks if the user with given email already exists
  const checkUser = await User.findOne({ email: userParams.email });
  if (checkUser) {
    res
      .status(401)
      .send("The user already exists, please try resetting your password.")
      .end();
  }

  // Generates hash for the password
  const passHash = await bcrypt.hash(userParams.password, 10);
  userParams.password = passHash;
  let user = new User(userParams);

  user = await user.save();

  res.status(200).send({
    id: user._id,
    email: user.email,
    name: user.name,
  });
});

router.post("/login", async (req, res) => {
  const userParams = req.body;

  if (!userParams.email || !userParams.password)
    res.status(401).send("Please provide both email and password.");

  const user = await User.findOne({ email: userParams.email });
  if (!user) {
    res.status(401).send("The given user does not exist.").end();
  }

  // Compares password with stored hash
  if (!(await bcrypt.compare(userParams.password, user.password))) {
    res.status(401).send("Incorrect Email or Password.").end();
  }

  const token = await jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    user.password
  );

  res.send(token);
});

module.exports = router;
