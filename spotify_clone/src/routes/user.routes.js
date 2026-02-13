// to create routes 
const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

// /api/user/register route for creating new Users
router.post('/register', userController.registerUser)

// /api/user/login route for login user
router.post('/login', userController.loginUser)

module.exports = router