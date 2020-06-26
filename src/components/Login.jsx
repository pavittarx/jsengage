// import Signup from "./components/Signup";
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core/";
import { Alert } from "@material-ui/lab";
import axios from "axios";

import styles from "./../styles/login.module.scss";

function handleLogin(params, err, msg) {
  // Clear previous error messages
  err("");
  msg("");

  axios
    .post("/api/login", params)
    .then((res) => {
      console.log("Response", res);
      msg("Login Success!");
    })
    .catch((error) => {
      console.log(error);
      err(error.response.data);
    });
}

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className={styles.form_container}>
        {err && <Alert severity="error"> {err} </Alert>}
        {message && <Alert severity="success"> {message} </Alert>}
        <TextField
          id="email"
          label="Email"
          variant="standard"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleLogin({ email, password }, setErr, setMessage)}
        >
          Login
        </Button>
    </div>
  );
};
