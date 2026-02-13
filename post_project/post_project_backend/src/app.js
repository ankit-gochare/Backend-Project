const express = require('express');
const app = express();

const cors= require('cors')


const postModel = require('./models/post.model')
const multer = require('multer')

const uploadFile = require('./services/storage.service')

const upload = multer({storage:multer.memoryStorage()})

app.use(cors())
app.use(express.json())

// to create post
app.post('/create-post' ,upload.single("image"),async (req,res)=>{
    // console.log(req.body)
    // console.log(req.file)

    const result = await uploadFile(req.file.buffer)

    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption
    })
    // console.log(result)
    return res.status(201).json({
        message:"post created successfully",
        post
    })
})

// to get posts
app.get('/posts' , async(req,res)=>{
    const posts = await postModel.find()

    return res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
})

module.exports = app