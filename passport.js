const passport = require('passport')
const GoogleStrategy = require('passport-google-token').Strategy;
const User = require('./models/user')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await User.findOrCreate({googleId: profile.id})
    return done(null, user)
}));