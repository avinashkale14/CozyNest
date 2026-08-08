const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        listing: {
            type: Schema.Types.ObjectId,
            ref: "Listing",
            required: true,
        },

        guest: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        checkIn: {
            type: Date,
            required: true,
        },

        checkOut: {
            type: Date,
            required: true,
        },

        guests: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: "Guests must be a whole number.",
            },
        },

        fullName: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        specialRequest: {
            type: String,
            default: "",
            trim: true,
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: ["Confirmed", "Cancelled"],
            default: "Confirmed",
        },

        bookedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Booking", bookingSchema);