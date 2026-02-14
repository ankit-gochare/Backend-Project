// for creating musicSchema and musicModel 
const mongoose = require('mongoose')

// creae musicSchema
const musicSchema = new mongoose.Schema({
    uri:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

// create musicModel
const musicModel = mongoose.model("music" , musicSchema)

// export musicModel
module.exports = musicModel