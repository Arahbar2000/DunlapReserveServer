const Booking = require('../models/booking');
const User = require('../models/user');
module.exports = {
    book: async (req, res, next) => {
        try {
            // Check if user already has a booking
            const oldBooking = await Booking.findOne({user: req.user.doc.googleId});
            if(oldBooking) {
                return res.status(405).json({error: 'user already has a booking'});
            }

            // Checks if court is already being used at specified time
            const result = await Booking.findOne({
                court: req.body.court,
                date: req.body.date,
                intervals: {
                    $elemMatch: {
                        $gte: req.body.intervals[0],
                        $lte: req.body.intervals[req.body.intervals.length - 1]}}
            })
            if (result) {
                return res.status(405).json({error: 'requested booking has been booked by another use'});
            }

            // Creates a new booking
            const booking = new Booking({
                court: req.body.court,
                user: req.user.doc.googleId,
                date: req.body.date,
                intervals: req.body.intervals
            });
            await booking.save();

            // updates the user profile to include its booking
            const user = await User.findOneAndUpdate({googleId: req.user.doc.googleId}, {booking: booking.id}, {new: true});

            return res.status(200).json({user});
        }
        catch(error) {
            return res.status(500).send(error);
        }
    },

    unbook: async (req, res, next) => {
        try {
            const user = await User.findOne({googleId: req.user.doc.googleId});
            if(!user.booking) {
                return res.status(405).json({error: 'user does not have a booking'})
            }
            await Booking.deleteOne({_id: user.booking})

            user.booking = undefined
            await user.save()

            return res.status(200).json({user: user})
        }
        catch(error) {
            return res.status(500).send(error)
        }
    }
};