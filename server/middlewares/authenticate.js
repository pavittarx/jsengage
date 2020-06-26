module.exports = (req, res, next) => {
  if(req.params.route === "bookings"){
    // authenticate
    console.log("Authenticating ...");
  }
  next();
} 