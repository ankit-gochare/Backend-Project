// for creating logics for different routes for music
const musicModel = require("../models/music.model")

const {uploadFile}= require('../services/storage.service')

// createMusic function for artists to create new music
// used in the /upload route
async function createMusic(req,res){

    // first we check if the user is logged in or not by checking the token
    const token = req.cookies.token;
    
    // if the user is not logged in then return unauthorized
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    // if the user is logged in then 
    // check that the user is only user or artist 
    // we use decoded token for this becuase we have given role in the token 
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        // if the user is not artist 
        // then return don't have access to create Music
        if(decoded.role !== "artist"){
            return res.status(403).json({
                message:"You don't have the acccess to create Music"
            })
        }
    
    

    // if the user is artist then create music

    // take out title from req.body
    const {title} = req.body

    // and file from req.file
    const file = req.file

    // upload the music file at imagekit 
    // and store the url in database

    // we do not have to provide the file 
    // we will pass file's buffer thet too converted into base64 string
    const result = await uploadFile(
        file.buffer.toString('base64')
    )

    // after uploading the file at imagekit create music and store the url in database
    const music = await musicModel.create({
        uri:result.url,
        title,
        artist:decoded.id
    })

    // return the rsponse for successful creation of music 
    return res.status(201).json({
        message:"Music is created successfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist
        }
    })
    }
    catch(err){
        console.log(err)
        return res.status(401).json({
            message:"Unauthorized"
        })
    }


}

// export the createMusic function to use in musicRoutes
module.exports = { createMusic}