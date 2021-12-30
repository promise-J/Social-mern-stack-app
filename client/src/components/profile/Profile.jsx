import './profile.css'
import Topbar from '../topbar/Topbar'
import Sidebar from '../sidebar/Sidebar'
import Main from '../main/Main'
import Rightbar from '../rightbar/Rightbar'
// import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'


function Profile() {
    // const auth = useSelector(state=> state.auth)
    // const {token} = useSelector(state=> state.token)
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    // const {user} = auth
    const {username} = useParams()

    useEffect(()=>{
      const userPost = async()=>{
        const res = await axios.get(`/posts/profile/${username}`)
        setPosts(res.data)
      }
      userPost()
    },[username])

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?username=${username}`);
          setUser(res.data);
        };
        fetchUser();
      }, [username]);

    return (
        <>
            <Topbar />
        <div className='profile'>
            <Sidebar />
            <div className="profileChange">
            <div className="profileNew">
                <div className="profileImg">
                   <img src={user?.profilePic?.url} alt="profile here" className="profileImgPic" />
                   <img src={user?.coverPic?.url} alt="cover here" className="profileImgCover" />
                </div>
                <div className="profileDescription">
                    <h1>{user.username}</h1>
                    <p>{user.description || 'Please add a description'}</p>
                </div>
            </div>
            <div className="profileBottom">
            <Main Posts={posts} username={username} />
            <Rightbar user={user} />
            </div>
            </div>
        </div>
        </>
    )
}

export default Profile
