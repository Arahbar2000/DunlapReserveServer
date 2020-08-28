const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRouter = require('./routes/users');
const bookingRouter = require('./routes/bookings')
const courtRouter = require('./routes/courts')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
})
app.use(cors())
app.use(courtRouter)
app.use(userRouter);
app.use(bookingRouter)

const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/DunlapReserve', {useNewUrlParser: true});

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});

