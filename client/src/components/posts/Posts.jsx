import { FavoriteOutlined, MoreVertOutlined, ThumbUp } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import {useSelector} from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {format} from 'timeago.js'

function Posts({post}) {
    const [likes, setLikes] = useState(post.like.length)
    // const {user} = useSelector(state=> state.auth)
    // const {token} = useSelector(state=> state.token)
    const [poster, setPoster] = useState(null)
    const [liked, setLiked] = useState(false)
    const [toggleOption, setToggleOption] = useState(false)

    useEffect(()=>{
        setLiked(post.like.includes(poster?._id))
    },[post, poster?._id])
    
    useEffect(()=>{
       const getPoster = async()=>{
         const res = await axios.get(`/users/?userId=${post.userId}`)
         setPoster(res.data)
       }
       getPoster()
    },[post.userId])


    const likeHandler = async()=>{
        try {
            await axios.put(`/posts/${post._id}/like`, {userId: poster._id})
            setLikes(liked ? likes - 1 : likes + 1)
            setLiked(!liked)
        } catch (error) {
            console.log(error)
        }
    }

    const toggleOptions = ()=>{
        setToggleOption(!toggleOption)
    }
   

    return (
        <div onClick={()=> toggleOption && setToggleOption(false)} className="mainPost">
        <div className="mainPostTop">
            <div style={{opacity: toggleOption ? '1' : '0'}} className="extra-dot">
                <Link style={{color: 'inherit', textDecoration: 'none', width: '100%'}} to={`/post/${post._id}`}><p>Edit</p></Link>
                <p>Delete</p>
            </div>
            <div className="mainPostDetails">
                <Link to={`/profile/${poster?.username}`}>
               <img src={poster?.profilePic?.url} alt="" className="mainPostImg" />
                </Link>
               <span className="mainPostUsername">{poster?.username}</span>
               <span className="mainPostTime">{format(new Date(post.createdAt))}</span>
            </div>
            <MoreVertOutlined onClick={toggleOptions} />
        </div>
        <div className="mainPostBody">
            <p className="mainPostDescription">{post.content}</p>
            {
               post.image && <img src={post.image?.url} alt="" className="mainPostTitleImg" />
            }
        </div>
        <div className="mainPostBottom">
            <div className="mainPostBottomLike">
               <ThumbUp onClick={likeHandler} className='mainPostBottomLikeIcon' />
               <FavoriteOutlined onClick={likeHandler} className='mainPostBottomHeartIcon' />
               <span className="mainPostLikeCon">{likes < 1 ? 'No likes' : likes} {likes < 1 ? '' : likes === 1 ? 'person' : 'people liked it'}</span>
            </div>
            <div className="mainPostBottomComment">
                <Link style={{color: 'inherit', textDecoration: 'none'}} to={`/post/${post._id}`}>View Comments</Link>
            </div>
        </div>
    </div>
    )
}

export default Posts
