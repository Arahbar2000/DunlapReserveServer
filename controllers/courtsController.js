const Booking = require('../models/booking')
const User = require('../models/user')
const { dateToInterval, intervalToDate } = require('../helpers/timeHelpers')

module.exports = {
    getCourt: async (req, res, next) => {
        try {
            const current = new Date()
            const interval = dateToInterval(current)
            const booking = await Booking.findOne({
                court: req.body.court,
                date: current.getDate(),
                intervals: interval
            })
            console.log(booking)
            if(!booking) {
                return res.status(200).json({empty: true})
            }

            const user = await User.findOne({oauthID: booking.user})
            return res.status(200).json({empty: false, booking, user})
        } catch(error) {
            console.log(error)
            return res.status(500).json({error: 'error with getting court state for court ' + req.body.court})
        }
    },

    getEvents: async (req, res, next) => {
        const bookings = await Booking.find({})
        const promises = bookings.map(async booking => {
            const user = await User.findOne({googleId: booking.user})
            const start = intervalToDate(booking.intervals[0])
            console.log(start)
            const end = intervalToDate(booking.intervals[booking.intervals.length - 1])
            start.setDate(booking.date)
            end.setDate(booking.date)
            return {
                id: booking.user,
                resourceId: booking.court,
                title: user.displayName,
                start: start.getTime(),
                end: end.getTime()
            }
        })

        const events = await Promise.all(promises)
        return res.json(events)
        
    }
}