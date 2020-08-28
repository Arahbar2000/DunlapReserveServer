const express = require('express')
const { getCourt, getEvents } = require('../controllers/courtsController')

const router = express.Router()

router.post('/court', getCourt)
router.get('/hello', (req, res, next) => {
    console.log(req.body)
    res.end()
})
router.get('/events', getEvents)

module.exports = router
