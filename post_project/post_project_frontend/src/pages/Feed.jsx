import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import {useEffect} from 'react'

const Feed = () => {

    const [posts, setPosts] = useState([
        {
            _id:"1",
            image:"https://plus.unsplash.com/premium_photo-1769019242610-1fae526340cc?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
            caption:"3 patti"
        }
    ])

    useEffect(()=>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            // console.log(res.data)
            setPosts(res.data.posts)
        })
    },[])

  return (
    <section className='feed-section'>
        {
            posts.length >0 ? (
                posts.map((post) =>(
                    <div key={post._id} className='post-card'>
                        <img src={post.image} alt={post.caption} />
                        <p>{post.caption}</p>
                    </div>
                ) )
            ):(
                <h3>No posts available</h3>
            )
        }

    </section>
  )
}

export default Feed