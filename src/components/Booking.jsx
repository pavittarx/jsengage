import React, { useState, useEffect } from "react";
import moment from "moment";

import { Alert } from "@material-ui/lab";
import { TextField, MenuItem, Button } from "@material-ui/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import styles from "./../styles/bookings.module.scss";
import {
  getSlots,
  getServiceList,
  getStartEndTimings,
  generateSlots,
  bookSlot,
} from "./../libs/bookings";

// Main bookings Component
export default () => {
  const [facilities, setFacilities] = useState();

  // Runs only on Intial Render
  useEffect(() => {
    getServiceList(setFacilities);
  }, []);

  return (
    <>
      {/* facilities is an array, so it needs to checked for emptiness */}
      {facilities ? (
        facilities.length ? (
          <BookingsSelection facilities={facilities} />
        ) : (
          <h1> You must log in.</h1>
        )
      ) : (
        <h1> Loading...</h1>
      )}
    </>
  );
};

// renders service pickers & date pickers
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
      <ListSlots slots={filledSlots} date={date} type={type} />
    </>
  );
}

// renders selection list for facilities
function ListFacilities(value, index) {
  return (
    <MenuItem key={"k-" + index} value={index}>
      {value}
    </MenuItem>
  );
}

// renders the list of available slots
function ListSlots({ slots, type, date }) {
  // It is assumed that slots are booked from 7-9 each day,
  // and each slot is an hour long.
  const timings = getStartEndTimings(date, { start: 7, end: 21 });
  const freeSlots = slots ? generateSlots(timings, slots) : null;

  console.log(slots, type, date, "Timings", timings, "free", freeSlots);

  const [selectedSlot, setSelectedSlot] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [err, setErr] = useState();
  const [message, setMessage] = useState();

  return (
    <>
      {err && <Alert severity="error"> {err} </Alert>}
      {message && <Alert severity="Success"> {message} </Alert>}
      {freeSlots && (
        <div className={styles.slots_container}>
          {freeSlots.map((slot, index) => {
            return (
              <Button
                key={"slot-" + index}
                onClick={() => {
                  setDialogOpen(true);
                  setSelectedSlot(freeSlots[index]);
                }}
                variant="contained"
                color="secondary"
              >
                {moment(slot).format("hh:mm a")}
              </Button>
            );
          })}

          {dialogOpen && (
            <ConfirmationDialog
              open={dialogOpen}
              setOpen={setDialogOpen}
              slot={selectedSlot}
              type={type}
              message={setMessage}
              err={setErr}
            />
          )}
        </div>
      )}
    </>
  );
}

function ConfirmationDialog({ open, setOpen, slot, type, message, err }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Booking Your Slot"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The slot will booked for {moment(slot).format("DD MMMM YYYY")} at{" "}
            {moment(slot).format("hh:mm a")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              bookSlot({ type, slot }, err, message);
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
