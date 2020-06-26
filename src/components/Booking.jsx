import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import { TextField, MenuItem } from "@material-ui/core";
import styles from "./../styles/bookings.module.scss";

function getServiceList(facilities) {
  axios
    .get("/api/bookings")
    .then((res) => {
      console.log(res);
      facilities(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function ListFacilities(value, index) {
  return (
    <MenuItem key={"k-" + index} value={index}>
      {value}
    </MenuItem>
  );
}

function BookingsSelection({ facilities }) {
  const dateNow = moment().format("YYYY-MM-DD");

  const [type, setType] = useState("");
  const [date, setDate] = useState(dateNow);

  const [err, setErr] = useState();
  const [message, setMessage] = useState();

  console.log(type);
  return (
    <div className={styles.container}>
      {err && <Alert severity="error"> {err} </Alert>}
      {message && <Alert severity="error"> {message} </Alert>}
      <TextField
        select
        required
        color="primary"
        label="Service Type"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
        className={styles.selection}
      >
        {facilities.map((f, i) => ListFacilities(f, i))}
      </TextField>

      <TextField
        type="date"
        color="primary"
        required
        defaultValue={dateNow}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        className={styles.datepicker}
      />

      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={() => {
          checkSlots({ type, date }, setErr, setMessage);
        }}
      >
        Check Slots
      </Button>
    </div>
  );
}

function checkSlots(params, err, msg) {
  err(""); 
  msg("");

  if(!params.type || !params.date){
    err("Please provide both Service Type & Date.");
  }

  const today = moment().startOf("day").unix();
  const date = moment(params.date).unix();

  if(date < today){
    err("The date must be current or a future date.");
    return;
  }

  axios
    .post("/api/bookings/slots", params)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default () => {
  const [facilities, setFacilities] = useState([]);

  // Runs only on Intial Render
  useEffect(() => {
    getServiceList(setFacilities);
  }, []);

  return (
    <>
      {/* facilities is an array, so it needs to checked for emptiness */}
      {!facilities.length && "You must log in."}
      {facilities.length ? <BookingsSelection facilities={facilities} /> : null}
    </>
  );
};
