const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const userRoute = require('./routes/users')

// middleweare
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/users', userRoute)

app.listen(8800, () => {
    console.log("server is running..")
})