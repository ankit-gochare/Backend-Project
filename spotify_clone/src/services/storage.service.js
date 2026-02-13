// to create the logic of storing music file at imagekit 

// require imagekit
const {ImageKit} = require("@imagekit/nodejs")

// create new imagekit as imagekitClient by providing the privatekey
const imagekitClient = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

// create uploadFile function to upload files n imagekit
// provide file , fileName and Folder to specify storage 
async function uploadFile(file){
    const result = await imagekitClient.files.upload({
        file,
        fileName:"music"+ Date.now(),
        folder:"spotify-clone/music"
    })
    return result
}

// export the uploadFile function to use in createMusic function
module.exports ={ uploadFile }
