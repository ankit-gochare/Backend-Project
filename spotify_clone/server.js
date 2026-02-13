// starting server

// dotenv to use dotenv variables 
require('dotenv').config();

const app = require('./src/app')

const connectDB = require('./src/db/db')

// calling connectDB to connect to database
connectDB()


// to start the server on port 3000
app.listen(3000 , ()=>{
    console.log("The server is running on port 3000");
})