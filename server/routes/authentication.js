const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../database/index");

router.post("/signup", async (req, res) => {
  const userParams = req.body;
  // checks if the provided fields are not empty
  if (!userParams.name || !userParams.email || !userParams.password) {
    res.status(401).send("One or more fields required for signup are empty");
    // the following return statment is used to halt further execution.
    return;
  }

  // checks if the user with given email already exists
  const checkUser = await User.findOne({ email: userParams.email });
  if (checkUser) {
    res
      .status(401)
      .send("The user already exists, please try resetting your password.")
      .end();
    return;
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

  if (!userParams.email || !userParams.password){
    res.status(401).send("Please provide both email and password.");
    return;
  }

  const user = await User.findOne({ email: userParams.email });
  if (!user) {
    res.status(401).send("The given user does not exist.").end();
    return;
  }

  // Compares password with stored hash
  if (!(await bcrypt.compare(userParams.password, user.password))) {
    res.status(401).send("Incorrect Email or Password.").end();
    return;
  }

  const token = await jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    user.password
  );

  // Sets the JWTToken as Cookie used for Authentication on /api routes
  res.cookie("token", token, { path: "/api", httpOnly: true }).send("Login Success");
});

router.get("/login-status", (req, res)=>{
  const token = req.headers.cookie.split("=")[1];

  res.send(token);
})

module.exports = router;