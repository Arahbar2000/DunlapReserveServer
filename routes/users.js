const express = require('express')
const passport = require('passport')
const passportConf = require('../passport')
const { signup, getUserProfile } = require('../controllers/userController')
const googleAuth = passport.authenticate('google-token', { session: false })

const router = express.Router()

router.post('/signup', googleAuth, signup)
router.post('/userProfile', googleAuth, getUserProfile)

module.exports = router