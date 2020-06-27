// It contains Library functions for bookings.js
import axios from "axios";
import moment from "moment";

export function getServiceList(facilities) {
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

// start and end in 24h formats
export function getStartEndTimings(date, {start, end}){
  return {
    start: moment(date).valueOf() + (start*3600000),
    end: moment(date).valueOf() + (end*3600000)
  }
}

export function generateSlots({start, end}, restrictions){
  const difference = 3600000; // 1h difference
  const slots = [];
  
  for(let i=start; i<end; i+=difference){
    console.log(i);
    if(!restrictions.includes(i)) slots.push(i);
  }
  
  return slots;
}

export function getSlots(params, err, slots){
  err("");
  slots("");

  if (!params.type || !params.date) {
    err("Please provide both Service Type & Date.");
    return;
  }

  const today = moment().startOf("day").unix();
  const date = moment(params.date).unix();

  if (date < today) {
    err("The date must be current or a future date.");
    return;
  }

  axios
    .post("/api/bookings/slots", params)
    .then((res) => {
      console.log(res);
      slots(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default {
  getSlots,
  getServiceList,
  generateSlots,
  getStartEndTimings
}