import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function OneUser({user, currentUser, cb, setCb}) {


    const addFriend = async()=>{
        try {
            await axios.post('api/conversation', {senderId: currentUser?._id, recieverId: user?._id})
            setCb(!cb)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div key={user._id} className="allUsers-content">
        <div className="image">
          <img src={user?.profilePic.url} alt=""/>
        </div>
        <div className="details">
         <h4>{user?.username}</h4>
         <button onClick={addFriend}>Add {user?.username}</button>
         <button>
         <Link style={{color: 'white', textDecoration: 'none'}} to={`/profile/${user.username}`}>
             View {user?.username}
         </Link>
         </button>
        </div>
      </div>
    )
}

export default OneUser
