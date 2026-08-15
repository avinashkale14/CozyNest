const express = require("express");

const router = express.Router();

const bookingsController = require("../controllers/bookings");

const { isLoggedIn } = require("../middleware");


// BOOKING CONFIRMATION PAGE

router.get(
    "/listings/:id/book",
    isLoggedIn,
    bookingsController.renderBookingForm
);


// CREATE BOOKING

router.post(
    "/bookings",
    isLoggedIn,
    bookingsController.createBooking
);


// CANCEL BOOKING

router.put(
    "/bookings/:id",
    isLoggedIn,
    bookingsController.cancelBooking
);

// REMOVE CANCELLED BOOKING HISTORY

router.delete(
    "/bookings/:id",
    isLoggedIn,
    bookingsController.deleteBooking
);


// MY BOOKINGS

router.get(
    "/bookings",
    isLoggedIn,
    bookingsController.myBookings
);

module.exports = router;