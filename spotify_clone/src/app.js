// creating server
const express = require('express')

// cookieParser is used to set token in cookies
const cookieParser = require('cookie-parser')

// require userRoutes for using user routes
const userRoutes = require('./routes/user.routes')

// require musicRoutes for using music Routes
const musicRoutes = require('./routes/music.routes')

app.use(express.json());
app.use(cookieParser());

const app = express()

// use userRoutes in the end 
app.use('/api/user' , userRoutes)
app.use('/api/music' , musicRoutes)

module.exports = app ;