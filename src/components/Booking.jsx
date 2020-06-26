import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

import styles from "./../styles/bookings.module.scss";

function setBookings(facilities) {
  console.log("running setLogin()");

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

function BookingTimer(show) {
  console.log(moment());
  return (
    <TextField
      type="datetime-local"
      defaultValue={moment().format("YYYY-MM-DDTHH:MM")}
      inputProps={{
        step: 3600,
      }}
    ></TextField>
  );
}

function BookingsList(facility, index) {
  return (
    <div key={index} className={styles.maincontainer}>
      <div className={styles.container}>
        <span className={styles.text}>{facility}</span>
        <Button className={styles.button} variant="contained" color="primary">
          Book
        </Button>
      </div>
      <BookingTimer className={styles.datepicker} />
    </div>
  );
}

export default () => {
  const [facilities, setFacilities] = useState([]);
  const [bookTime, setBookingTime] = useState("");

  // Runs only on Intial Render
  useEffect(() => {
    setBookings(setFacilities);
  }, []);

  const fList = facilities.map((f, i) => BookingsList(f, i));

  return (
    <>
      {!facilities.length && "You must log in."}
      {facilities && <div> {fList} </div>}
    </>
  );
};
