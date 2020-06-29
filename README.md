# @jsnegage 

## Directory Structure

#### Overview

```
  / public (public assets for react-frontend)
  / server (express server code)
  / src    (react specific files)
  - package.json (for react only)
```
#### Server Directory
 
```
  +/ server
     / database
     / middlewares 
     / routes   
     - index.js (starting point)
```

`database` - maintains connection and provides interfaces to the database. 

`middlewares` - It contains project specific middlewares.

`routes` - It contains the `/api` routes, i.e.,the backend logic for the server.

Each of these folders expose these features as a module, via its own `index.js`. Hence, it is also possible to export each of these as a separate npm module with ease. 

[@pavittarx](https://github.com/pavittarx)

----

## Text of the problem

**Facility Booking:**

* An Apartment Complex has a lot of facilities for its residents to use. Some of them include Tennis Court, Swimming Pool, Badminton Court, Gym, Club House and Cycle tracks. These facilities are free and available to all the residents.

* Apartment Society requires a web portal where the residents can book to access those facilities.

**Booking process is simple.**

  * A resident will login to the web portal and select the facility. 
  * A Resident can choose the date and time range. For example 1st Jan 2019, 10 AM to 11 AM.
  * If the slot is available, resident booking gets confirmed. 
  * If the slot is not available, i.e., if it’s already booked by another resident, it will return an error. Residents can choose to book a different slot.
  * Residents can see the following once they login into the portal.,
    * List of available facilities
    * Book a facility

**Expected Outcome:**
* A login page for residents to access the portal.
* A dashboard for residents (features listed in the previous section).

**Technical requirements:**

* React should be used for frontend. (usage of Redux is a bonus)
* Node and Express JS should be used for the APIs. (adding unit tests is a bonus)
* MongoDB with Mongoose ORM.
* Deploy this application in heroku or any public cloud. (docker image is a bonus)

----

## Assumptions
* The Bookings take place between 7 AM to 9 PM. 
* Each booking slot is an hour long.