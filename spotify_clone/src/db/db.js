// to write database connection logic
const mongoose = require('mongoose');

const connectDB = async function(){
    mongoose.connect(process.env.MONGO_URI);
}

module.exports = connectDB;