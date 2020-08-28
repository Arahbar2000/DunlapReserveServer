const mongoose = require("mongoose");
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    user: {
        type: String,
        ref: 'user'
    },
    court: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    intervals: {
        type: Array,
        required: true
    }
})

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking