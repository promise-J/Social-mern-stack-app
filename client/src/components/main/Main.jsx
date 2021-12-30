import './main.css'
import Share from '../share/Share'
import Posts from '../posts/Posts'
import { useSelector } from 'react-redux'
import {CircularProgress} from '@material-ui/core'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { MoreVertOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'


function Main({username, SinglePostId}) {
    // const {posts} = useSelector(state=> state.posts)
    const auth = useSelector(state=> state.auth)
    // const {posts: allPosts} = useSelector(state=> state.posts)
    const [posts, setPosts] = useState([])
    const [cb, setCb] = useState(false)
    const {user} = auth
    const [post, setPost] = useState({})
    const [poster, setPoster] = useState('')
    const [editDesc, setEditDesc] = useState('')
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])
    const [reComment, setReComment] = useState(false)
    const scrollRef = useRef();

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [comments]);
    
    useEffect(()=>{
      const getPost = async()=>{
        const res = await axios.get(`/posts/${SinglePostId}`)
        setPost(res.data)
        setEditDesc(res.data.content)
      }
      getPost()
    },[SinglePostId])

    useEffect(() => {
        const fetchPosts = async () => {
          const res = username
            ? await axios.get("/posts/profile/" + username)
            : await axios.get("posts/timeline/" + user?._id);
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        };
        fetchPosts();
      }, [username, user._id, cb]);

      useEffect(()=>{
       const getComments = async()=>{
         const res = await axios.get(`/api/comment/all/${post._id}`)
         setComments(res.data)
       }
       getComments()
      }, [post._id, reComment])

      useEffect(()=>{
        const getPoster = async()=>{
          const res = await axios.get(`/users/?userId=${post.userId}`)
          setPoster(res.data)
        }
        if(post){
          getPoster()
        }
     },[post.userId, post])

     const handleEdit = async()=>{
       try {
         const res = await axios.put(`/posts/update/${post._id}`, {userId: user._id, content: editDesc})
         console.log(res)
       } catch (error) {
         console.log(error)
       }
     }

      const handleComment = async()=>{
        try {
          if(!commentText) return
          await axios.post('/api/comment', {user: user, postId: post._id, text: commentText})
          setCommentText('')
          setReComment(!reComment)
        } catch (error) {
          console.log(error)
        }
      }


      if(SinglePostId) return (
        <div style={{ height: '100%'}} className="main">
          <div className="mainWrapper">
          <div className="mainPost" style={{width: SinglePostId && '63%'}}>
        <div className="mainPostTop">
            
            <div className="mainPostDetails">
                <Link to={`/profile/${poster?.username}`}>
               <img src={poster?.profilePic?.url} alt="i" className="mainPostImg" />
                </Link>
               <span className="mainPostUsername">{poster?.username}</span>
               <span className="mainPostTime">{format(new Date(post.createdAt))}</span>
            </div>
            <MoreVertOutlined />
        </div>
        <div className="mainPostBody">
            <p className="mainPostDescription"><input name='desc' value={editDesc} onChange={(e)=> setEditDesc(e.target.value)} style={{width: '100%', height: '30px', outline: 'none', border: '1px solid gray'}} placeholder='Text here' /></p>
            {
               post.image && <img src={post.image?.url} alt="i" style={{width: SinglePostId && '100%', height: SinglePostId && '150px', objectFit: 'cover'}} className="mainPostTitleImg" />
            }
        </div>
        <div className="mainPostBottom">
            <div className="mainPostBottomComment" style={{width: '100%', height: '20px'}}>
                <span>{comments && comments.length} comments</span>
                <button onClick={handleEdit} style={{position: 'absolute', top: '0', right: '0', 
                padding: '5px 12px', background: 'teal', color: 'white', outline: 'none', border: 'none'}}>Save</button>
            </div>
        </div>
    </div>
        <div className="comments">
          <div className="comments-input-div">
          <input className='comment-input' name='comment' value={commentText} onChange={(e)=> setCommentText(e.target.value)} placeholder='Comment here' />
          {commentText && <button onClick={handleComment}>Comment</button>}
          </div>
          {
            comments && comments.map(c=>(
            <div ref={scrollRef} key={c._id} className="comment">
             <img src={c?.user?.profilePic?.url} alt="none" />
             <span>{c.text}</span>
            </div>
            ))
          }
        </div>
          </div>
        </div>
      )
      

    
    return (
        <div className='main'>
            <div className="mainWrapper">
            
            {
                !username &&   <Share cb={cb} setCb={setCb} />
            }
            {   posts?.length ===0 ? <h2><CircularProgress /> </h2> : 
                posts?.map(p=>(
                    <Posts user={user} post={p} key={p._id} />
                ))
            }
            </div>
        </div>
    )
}

export default Main
