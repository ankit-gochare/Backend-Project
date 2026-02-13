// create logic for user register , login etc 

const userModel = require('../models/user.model')

// require bcrypt to hash password
const bcrypt = require('bcrytjs')

// registerUser function to create a new user in database 
// used in the /register route
async function registerUser(req,res){
    // taking user data from the user register request
    const {username , email , password , role="user"} = req.body;

    // check if user with same email or username already exist or not
    const isUserAlraedyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    // if user alrady exists give message and return 
    // no new user is created 
    if(isUserAlraedyExists){
        return res.status(409).json({
            message:"User Already Exists"
        })
    }

    // hash password to store in password 
    const hashedPassword = await bcrypt.hash(password ,10)

    // if user not exists thencreate a new user
    const user = {
        username, 
        email,
        password:hashedPassword,
        role,
    }

    // now create token for the user to login
    const token = jwt.sign({
        id:user._id,
        role:user.role
    }, process.env.JWT_SECRET)

    // now set the token into cookie so the user gets logged in now 
    res.cookie("token" , token);

    // return response for successfull creation of user
    res.status(201).json({
        message:"User created successfully",
        user:{
            username:user.username,
            email:user.email,
            role:user.role,
            password:user.password
        }
    })
} 




// loginUser function to login existing user
// used in the /login route
async function loginUser(req,res){
    
    // taking out username , email and password from req.body
    const {username , email , password } = req.body

    // finding user by username or email
    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    // if user not found return invalid credentails
    if(!user){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    // if user exists check if the password is valid or not
    const isPasswordValid = await bcrypt.verify(password , user.password )

    // if password is not valid return invalid credentials
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Credentails"
        })
    }

    // if password is correct create token
    const token = jwt.sign({
        id:user._id,
        role:user.role
    }, process.env.JWT_SECRET)

    // set token in the cookie so the user gets logged in 
    res.cookie("token" , token)

    // send rsponse for user logged in successfully
    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.usrename,
            email:user.email,
            role:user.role
        }
    })

}


// exort the function to create routes
module.exports = { registerUser , loginUser }