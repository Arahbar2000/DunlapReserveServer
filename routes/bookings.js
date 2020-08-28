const express = require('express')
const passport = require('passport')
const passportConf = require('../passport')
const { book, unbook } = require('../controllers/bookController')
const googleAuth = passport.authenticate('google-token', { session: false })

const router = express.Router()

router.post('/book', googleAuth, book)
router.post('/unbook', googleAuth, unbook)

module.exports = router