import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Button from "@material-ui/core/Button";
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
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  console.log(type, date, time);
  return (
    <div className={styles.container}>
      <TextField
        select
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
        defaultValue={moment().format("YYYY-MM-DD")}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        className={styles.datepicker}
      />
      <TextField
        type="time"
        color="primary"
        defaultValue={moment().format("HH:00")}
        className={styles.timepicker}
        onChange={(e) => {
          setTime(e.target.value);
        }}
        inputProps={{
          step: 3600,
        }}
      />

      <Button variant="contained" color="primary" className={styles.button}>
        Book
      </Button>
    </div>
  );
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
