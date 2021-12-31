import './topbar.css'
import { Search, Person, Chat, Notifications, PeopleAltOutlined } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { dispatchLogout } from '../../redux/actions/authAction'
import { useEffect, useState } from 'react'


function Topbar({cb}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [logged, setLogged] = useState(false)
    const [conversation, setConversation] = useState([])
    const auth = useSelector(state=> state.auth)
    const {user} = auth

    useEffect(()=>{
       setLogged(auth.isLogged)
    },[auth.isLogged])

    useEffect(()=>{
      const getConversation = async()=>{
         const res = await axios.get("/api/conversation/"+ user?._id)
         setConversation(res.data)
      }
      getConversation()
    },[user._id, cb])

    const logout = async ()=> {
        try {
            await axios.get('/auth/logout')
            localStorage.removeItem('firstLogin')
            dispatch(dispatchLogout())
            history.push('/login')
        } catch (error) {
            localStorage.removeItem('firstLogin')
            dispatch(dispatchLogout())
            history.push('/login')
        }
    }
//    if(user.length===0) return null
    
    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topbar-left">
                   <Link to='/home' style={{textDecoration: 'none', color: 'inherit'}}>
                   G-STAR
                   </Link> 
                </div>
                <div className="topbar-center">
                    <div className="topbarSearch">
                        <Search className='topbarSearchIcon' />
                        <input placeholder="Search for friends, post or Video" className="topbarSearchInput" />
                    </div>
                </div>
                <div className="topbar-right">
                    <div className="topbarRightLinks">
                        <div className="topbarRightLink">
                            {
                                logged ?  <Link to='#'
                                style={{textDecoration: 'none', color: 'inherit'}}
                                onClick={logout}
                                >
                               <h5>Logout</h5>
                               </Link>  :  <Link to='/login'
                           style={{textDecoration: 'none', color: 'inherit'}}>
                          <h5>Login</h5>
                          </Link>  
                            }
                         
                        </div>
                        <div className="topbarRightLink">
                            <h5>Timeline</h5>
                        </div>
                    </div>
                    <div className="topbarRightIcons">
                        <div className="topbarRightIcon">
                            <Person />
                            {0>1 && <span className="topbarRightLabel"></span> }
                        </div>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to='/messenger'>
                            <div className="topbarRightIcon">
                              <Chat />
                              <span className="topbarRightLabel">{conversation.length}</span>
                            </div>
                        </Link>
                        <Link to='/allUsers' style={{textDecoration: 'none', color: 'inherit'}}>
                            <div className="topbarRightIcon">
                            <PeopleAltOutlined />
                            <span className="topbarRightLabel">+</span>
                            </div>
                        </Link>
                        {
                            user?.notification?.length !== 0 && 
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to='/notifications'>
                            <div className="topbarRightIcon">
                            <Notifications />
                            {user?.notification?.length > 0 && <span className="topbarRightLabel">{user?.notifications?.length}</span>}
                        </div>
                        </Link>
                        }
                    </div>
                </div>
                {
                    logged ? <Link to={`/profile/${user.username}`}>
                        <img src={user?.profilePic?.url} alt="here" className="topbarRightImg" /> 
                    </Link>
                    : null
                }
            </div>
        </div>
    )
}

export default Topbar
