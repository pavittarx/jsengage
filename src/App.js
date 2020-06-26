import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core/";
import { Alert } from "@material-ui/lab";

async function handleSignup(params, err, msg) {
  // Clears up previous error messages
  err("");
  msg("");

  axios
    .post("/api/signup", params)
    .then((res) => {
      console.log(res);
      msg("Signup Success");
    })
    .catch((error) => {
      console.log(error.response, error.message);
      err(error.response.data);
    });
}

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <form>
        {err && <Alert severity="error"> {err} </Alert>}
        {message && <Alert severity="success"> {message} </Alert>}
        <TextField
          id="name"
          label="Name"
          variant="standard"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
          onClick={() =>
            handleSignup({ name, email, password }, setErr, setMessage)
          }
        >
          Submit
        </Button>
      </form>
    </>
  );
};
