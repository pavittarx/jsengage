import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import styles from "./../styles/home.module.scss";

export default () => {
  return (
    <div className={styles.home_container}>
      <h1> Welcome to jsEngage </h1>
      <div className={styles.links_container}>
        <Link className={styles.links} to="/login">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
        <Link className={styles.links} to="/bookings">
          <Button variant="contained" color="primary">
            Bookings Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
