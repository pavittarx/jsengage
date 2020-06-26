import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Booking from "./components/Booking";

import "./styles/global.scss";

export default () => {
  return (
    <Router>
      <nav>
      <Link to="/"> Home </Link>
      <Link to="/signup"> Signup </Link>
      <Link to="/login"> Login </Link>
      <Link to="/bookings"> Booking </Link>
      </nav>

      <Switch>        
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/bookings">
          <Booking />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
