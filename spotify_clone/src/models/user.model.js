// to define userSchema and 
// to create userModel 
// using role based authentication 
// we have to tyoes of users 
// 1. user :- can only listen music
// 2. artist :- can create music also

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user", "artist"],
        default:"user"
    }
})

// create userModel
const userModel = mongoose.model("user" , userSchema)

// export userModel
module.exports = userModel;