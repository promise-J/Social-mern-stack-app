 import { Add, Remove } from '@material-ui/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import Online from '../online/online'
import './rightbar.css'


function Rightbar({user}) {
  const [friends, setFriends] = useState([])
  const auth = useSelector(state=> state.auth)
  const {token} = useSelector(state=> state.token)
  const {user: currentUser} = auth
  const [followed, setFollowed] = useState(
    currentUser?.followings?.includes(user?._id)
  );


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      // if (followed) {
        // await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser?._id});
        // console.log('You unfollowed this user ')
        // setFollowed(!followed)
      // } else {
        await axios.put(`/users/${user._id}/follow`, {userId: currentUser?._id});
        setFollowed(!followed)
      // }
      // setFollowed(!followed);
    } catch (err) {
      console.log(err)
    }
  };

    return (
        <div className='rightbar'>
          <div className='rightbarWrapper'>
          {user && (user?.username !== currentUser?.username) && 
          (
          <>
          <button className="rightbarFollowButton" onClick={handleClick}>
            {!followed ? "Unfollow" : "Follow"}
            {!followed ? <Remove /> : <Add />}
          </button>
          <button className='rightbarMessageButton'>Add Friend</button>
          </>
        )}
            {
              user && (
                <div className="userDetails">
                  <div className="userDetail">
                    <span>Relationship</span>
                    <span><b>{user.relationship ? user?.relationship : 'N/A'}.</b></span>
                  </div>
                  <div className="userDetail">
                    <span>City: </span>
                    <span><b>{user.city ? user?.city : 'N/A'}.</b></span>
                  </div>
                  <div className="userDetail">
                    <span>Home town: </span>
                    <span><b>{user.hometown ? user?.hometown : 'N/A'}.</b></span>
                  </div>
                  <div className="userDetail">
                    <span>Sex: </span>
                    <span><b>{user.sex ? user?.sex : 'N/A'}.</b></span>
                  </div>
                </div>
              )
            }
            <div className='rightbarTop'>
            <div className='rightbarBirthday'>
               <img src='/images/w1.jpeg' className='rightbarBirthdayImg' alt='' />
               <div className="rightbarBirthdayDiv">
                 <span className="rightbarBirthdayText">
                   <b>Favour Johnson</b> and <b>3 others friends</b> have birthday today.
                 </span>
               </div>
            </div>
            </div>
            <div className="rightbarImageContainer">
            <img src={`/images/w4.jpeg`} alt="" className="rightbarImage" />
            </div>
            <div className="rightbarOnlineFriends">
              <h3 className='rightbarOnlineHead'>{friends.length===0 ? '' : 'Online Friends'}</h3>
              {
                friends.length === 0 ? <h2>Connect to friends Now!</h2> :
                friends.map(friend=>(
              <ul className="rightbarOnlineFriendLists">
                <Link style={{color: 'inherit', textDecoration: 'none'}} to={`/profile/${friend?.username}`}>
                <li className="rightbarOnlineFriendList">
                  <div className="rightbarOnlineStatus"></div>
                  <img src={friend?.profilePic?.url} alt="" className="rightbarOnlineFriendImg" />
                  <span className="rightbarOnlineFriendName">{friend?.username}</span>
                </li>
                </Link>
              </ul>
                ))
              }
            </div>
          </div>
        </div>
    )
}

export default Rightbar
