// to write database connection logic
const mongoose = require('mongoose');

const connectDB = async function(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to db")
    }
    catch(err){
        console.log("error in connecting to db" , err)
    }
}

module.exports = connectDB;