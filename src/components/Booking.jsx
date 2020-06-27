import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import { TextField, MenuItem } from "@material-ui/core";
import styles from "./../styles/bookings.module.scss";

import moment from "moment";
import {
  getSlots,
  getServiceList,
  getStartEndTimings,
  generateSlots,
} from "./../libs/bookings";

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
  const [filledSlots, setFilledSlots] = useState();

  return (
    <>
      <div className={styles.container}>
        {err && <Alert severity="error"> {err} </Alert>}
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
            getSlots({ type, date }, setErr, setFilledSlots);
          }}
        >
          Check Slots
        </Button>
      </div>
      <ListSlots slots={filledSlots} date={date} />
    </>
  );
}

function ListSlots({ slots, date }) {
  const timings = getStartEndTimings(date, { start: 7, end: 21 });
  console.log(timings);
  const freeSlots = slots ? generateSlots(timings, slots) : null;

  return (
    <>
      {freeSlots && (
        <div className={styles.slots_container}>
          {" "}
          {freeSlots.map((slot, index) => {
            return (
              <Button key={"slot-"+index} variant="contained" color="secondary">
                {moment(slot).format("hh:mm a")}
              </Button>
            );
          })}
        </div>
      )}
    </>
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
