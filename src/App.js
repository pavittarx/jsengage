import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";

export default () => {
  return (
    <Router>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>

      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
