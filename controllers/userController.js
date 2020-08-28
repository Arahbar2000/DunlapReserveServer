const User = require('../models/user');

module.exports = {
    signup: async (req, res, next) => {
        try {
            // Checks if user already exists
            await User.updateOne({googleId: req.user.doc.googleId}, {displayName: 'Anonymous'});

            res.status(200).end();
        } catch(error) {
            return res.status(500).json({error: 'error with signup'});
        }
    },

    getUserProfile: async (req, res, next) => {
        try {
            const user = await User.findOne({googleId: req.user.doc.googleId}).populate('booking')
            if (!user) {
                return res.status(500).json({error: 'user does not exist'})
            }

            return res.status(200).json({user: user.toObject()})

        } catch(error) {
            return res.status(500).json({error: 'error with getting userProfile'})
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            // Checks if user exists
            const user = await User.findOne({googleId: req.user.doc.googleId});
            if(!user) {
                return res.status(405).json({error: 'User does not exist'});
            }

            // Delete booking associated with that user, if exists
            await Booking.deleteOne({id: user.booking});

            // Deletes user profile
            await User.deleteOne({googleId: req.user.doc.googleId});

            return res.status(200).end();
        } catch(error) {
            return res.status(500).json({error: 'Error when trying to delete user'});
        }
    }
}