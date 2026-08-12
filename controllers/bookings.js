const Booking = require("../models/booking");
const Listing = require("../models/listing");


// =====================================================
// SHOW BOOKING CONFIRMATION PAGE
// =====================================================

module.exports.renderBookingForm = async (req, res) => {

    try {

        const { id } = req.params;

        const listing = await Listing.findById(id);

        if (!listing) {

            req.flash(
                "error",
                "Listing not found!"
            );

            return res.redirect("/listings");
        }

        res.render("bookings/new", {
            listing,
            query: req.query
        });

    } catch (error) {

        console.log("BOOKING PAGE ERROR:", error);

        req.flash(
            "error",
            "Unable to open booking page!"
        );

        return res.redirect("/listings");
    }
};


// =====================================================
// CREATE BOOKING
// =====================================================

module.exports.createBooking = async (req, res) => {

    try {

        const {
            listing: listingId,
            checkIn,
            checkOut,
            guests
        } = req.body;


        // =================================================
        // BASIC VALIDATION
        // =================================================

        if (!listingId || !checkIn || !checkOut || !guests) {

            return res.redirect("/listings");
        }


        // =================================================
        // FIND LISTING
        // =================================================

        const listing = await Listing.findById(listingId);

        if (!listing) {

            req.flash(
                "error",
                "Listing not found!"
            );

            return res.redirect("/listings");
        }


        // =================================================
        // VALIDATE GUESTS
        // =================================================

        const numberOfGuests = Number(guests);

        if (
            !Number.isInteger(numberOfGuests) ||
            numberOfGuests < 1
        ) {

            return res.status(400).render("bookings/new", {

                listing,

                query: {
                    checkIn,
                    checkOut,
                    guests
                },

                error: "Please select at least 1 guest."

            });
        }


        // =================================================
        // CONVERT DATES
        // =================================================

        const startDate = new Date(
            `${checkIn}T00:00:00`
        );

        const endDate = new Date(
            `${checkOut}T00:00:00`
        );


        // =================================================
        // INVALID DATE
        // =================================================

        if (
            Number.isNaN(startDate.getTime()) ||
            Number.isNaN(endDate.getTime())
        ) {

            return res.status(400).render("bookings/new", {

                listing,

                query: {
                    checkIn,
                    checkOut,
                    guests
                },

                error:
                    "Please select valid check-in and check-out dates."

            });
        }


        // =================================================
        // TODAY DATE
        // =================================================

        const today = new Date();

        today.setHours(0, 0, 0, 0);


        // =================================================
        // PAST CHECK-IN
        // =================================================

        if (startDate < today) {

            return res.status(400).render("bookings/new", {

                listing,

                query: {
                    checkIn,
                    checkOut,
                    guests
                },

                error:
                    "Check-in date cannot be in the past."

            });
        }


        // =================================================
        // CHECK-OUT MUST BE AFTER CHECK-IN
        // =================================================

        if (endDate <= startDate) {

            return res.status(400).render("bookings/new", {

                listing,

                query: {
                    checkIn,
                    checkOut,
                    guests
                },

                error:
                    "Check-out date must be after check-in date."

            });
        }


        // =================================================
        // CALCULATE NIGHTS
        // =================================================

        const timeDifference =
            endDate.getTime() - startDate.getTime();

        const numberOfNights =
            Math.ceil(
                timeDifference /
                (1000 * 60 * 60 * 24)
            );


        // =================================================
        // CHECK OVERLAPPING BOOKINGS
        // =================================================

        const existingBooking =
            await Booking.findOne({

                listing: listingId,

                status: "Confirmed",

                checkIn: {
                    $lt: endDate
                },

                checkOut: {
                    $gt: startDate
                }

            });


        if (existingBooking) {

            return res.status(400).render("bookings/new", {

                listing,

                query: {
                    checkIn,
                    checkOut,
                    guests
                },

                error:
                    "Sorry, this listing is already booked for the selected dates."

            });
        }


        // =================================================
        // CALCULATE TOTAL PRICE
        // =================================================

        const totalPrice =
            listing.price *
            numberOfNights *
            numberOfGuests;


        // =================================================
        // DEBUG LOG
        // =================================================

        console.log("=================================");
        console.log("BOOKING DETAILS");
        console.log("=================================");

        console.log("Listing:", listing.title);
        console.log("Check In:", checkIn);
        console.log("Check Out:", checkOut);
        console.log("Nights:", numberOfNights);
        console.log("Guests:", numberOfGuests);
        console.log("Price / Night:", listing.price);
        console.log("Total Price:", totalPrice);

        console.log("=================================");


        // =================================================
        // CREATE BOOKING
        // =================================================

        const booking = new Booking({

            listing: listingId,

            guest: req.user._id,

            checkIn: startDate,

            checkOut: endDate,

            guests: numberOfGuests,

            totalPrice: totalPrice,

            status: "Confirmed"

        });


        // =================================================
        // SAVE BOOKING
        // =================================================

        await booking.save();


        // =================================================
        // SUCCESS
        // =================================================

        req.flash(
            "success",
            "Booking confirmed successfully!"
        );

        return res.redirect("/bookings");


    } catch (error) {

        console.log("BOOKING ERROR:", error);

        req.flash(
            "error",
            "Something went wrong while creating booking!"
        );

        return res.redirect("/listings");
    }
};


// =====================================================
// MY BOOKINGS
// =====================================================

module.exports.myBookings = async (req, res) => {

    try {

        const bookings =
            await Booking.find({

                guest: req.user._id

            })
            .populate("listing")
            .sort({
                createdAt: -1
            });


        res.render("bookings/index", {
            bookings
        });

    } catch (error) {

        console.log("MY BOOKINGS ERROR:", error);

        req.flash(
            "error",
            "Unable to load your bookings."
        );

        return res.redirect("/listings");
    }
};


// =====================================================
// CANCEL BOOKING
// =====================================================

module.exports.cancelBooking = async (req, res) => {

    try {

        const { id } = req.params;


        // =================================================
        // FIND BOOKING
        // =================================================

        const booking =
            await Booking.findById(id);


        if (!booking) {

            req.flash(
                "error",
                "Booking not found!"
            );

            return res.redirect("/bookings");
        }


        // =================================================
        // SECURITY CHECK
        // =================================================

        if (
            booking.guest.toString() !==
            req.user._id.toString()
        ) {

            req.flash(
                "error",
                "You are not allowed to cancel this booking."
            );

            return res.redirect("/bookings");
        }


        // =================================================
        // ALREADY CANCELLED
        // =================================================

        if (booking.status === "Cancelled") {

            req.flash(
                "error",
                "This booking is already cancelled."
            );

            return res.redirect("/bookings");
        }


        // =================================================
        // CANCEL BOOKING
        // =================================================

        booking.status = "Cancelled";

        await booking.save();


        req.flash(
            "success",
            "Booking cancelled successfully!"
        );


        return res.redirect("/bookings");


    } catch (error) {

        console.log("CANCEL BOOKING ERROR:", error);

        req.flash(
            "error",
            "Unable to cancel booking."
        );

        return res.redirect("/bookings");
    }
};