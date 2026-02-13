// to create diffrent routes for music
const express = require('express')
const musicController = require('../controllers/music.controller') 

// require multer to receive file data in request from the frontend
const multer = require('multer')

const router = express.Router()

// create upload variable for multer.memoryStorage
// used in the /upload api
const upload = multer({
    storage:multer.memoryStorage()
})

// /api/music/upload route for artists to create music
router.post('/upload' , upload.single("music") , musicController.createMusic)

module.exports = router