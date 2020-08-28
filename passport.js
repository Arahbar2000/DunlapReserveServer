const passport = require('passport')
const GoogleStrategy = require('passport-google-token').Strategy;
const User = require('./models/user')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./config')
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await User.findOrCreate({googleId: profile.id})
    return done(null, user)
}));