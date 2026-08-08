const Booking = require("../models/booking");
const Listing = require("../models/listing");


// =====================================================
// HELPER - BOOKING PAGE REDIRECT
// =====================================================

const bookingRedirect = (listingId, checkIn, checkOut, guests) => {

    return `/listings/${listingId}/book?checkIn=${encodeURIComponent(
        checkIn || ""
    )}&checkOut=${encodeURIComponent(
        checkOut || ""
    )}&guests=${encodeURIComponent(
        guests || ""
    )}`;
};


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

        console.log(error);

        req.flash(
            "error",
            "Unable to open booking page!"
        );

        res.redirect("/listings");
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

            req.flash(
                "error",
                "Please provide all booking details."
            );

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

            req.flash(
                "error",
                "Please select at least 1 guest."
            );

            return res.redirect(
                bookingRedirect(
                    listingId,
                    checkIn,
                    checkOut,
                    guests
                )
            );
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
        // CHECK INVALID DATE
        // =================================================

        if (
            Number.isNaN(startDate.getTime()) ||
            Number.isNaN(endDate.getTime())
        ) {

            req.flash(
                "error",
                "Please select valid check-in and check-out dates."
            );

            return res.redirect(
                bookingRedirect(
                    listingId,
                    checkIn,
                    checkOut,
                    guests
                )
            );
        }



        // =================================================
        // TODAY DATE
        // =================================================

        const today = new Date();

        today.setHours(0, 0, 0, 0);



        // =================================================
        // PAST DATE VALIDATION
        // =================================================

        if (startDate < today) {

            req.flash(
                "error",
                "Check-in date cannot be in the past."
            );

            return res.redirect(
                bookingRedirect(
                    listingId,
                    checkIn,
                    checkOut,
                    guests
                )
            );
        }



        // =================================================
        // CHECK-OUT MUST BE AFTER CHECK-IN
        // =================================================

        if (endDate <= startDate) {

            req.flash(
                "error",
                "Check-out date must be after check-in date."
            );

            return res.redirect(
                bookingRedirect(
                    listingId,
                    checkIn,
                    checkOut,
                    guests
                )
            );
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

            req.flash(
                "error",
                "Sorry, this listing is already booked for the selected dates."
            );

            return res.redirect(
                bookingRedirect(
                    listingId,
                    checkIn,
                    checkOut,
                    guests
                )
            );
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


        res.redirect("/bookings");


    } catch (error) {

        console.log("BOOKING ERROR:", error);


        req.flash(
            "error",
            "Something went wrong while creating booking!"
        );


        res.redirect("/listings");
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

        console.log(error);

        req.flash(
            "error",
            "Unable to load your bookings."
        );

        res.redirect("/listings");
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


        res.redirect("/bookings");


    } catch (error) {

        console.log(error);

        req.flash(
            "error",
            "Unable to cancel booking."
        );

        res.redirect("/bookings");
    }
};