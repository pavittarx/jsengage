import React, { useState, useEffect } from "react";
import axios from "axios";

function setLogin(status) {
  console.log("running setLogin()");

  axios
    .get("/api/login-status")
    .then((res) => {
      console.log(res);
      status(true);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default () => {
  const [status, setStatus] = useState(false);

  // Runs only on Intial Render
  useEffect(()=>{
    setLogin(setStatus);
  }, []);

  return <>
  {!status && "Hello Bookings"}
  {status && <div> You are in. </div>}
  </>;
};
