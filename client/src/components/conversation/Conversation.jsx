import { useEffect, useState } from "react"
import axios from 'axios'
import './conversation.css'
import { DeleteOutlineSharp } from "@material-ui/icons"

function Conversation({currentUser, cb, conversation, setCb}) {
    const [user, setUser] = useState()

    useEffect(()=>{
       const friend = conversation.members.find(m=> m !== currentUser?._id)
    //    console.log(friend, ' my guy')
       const getUser = async()=>{
         const res = await axios.get(`/users/?userId=${friend}`)
         setUser(res.data)
       }
       getUser()
    },[conversation.members, currentUser?._id])

    const deleteConversation = async()=>{
        const res = await axios.delete(`api/conversation/${conversation._id}`)
        setCb(!cb)
        console.log(res)
    }


    return (
        <div className='chatMenuFriend'>
            <img
                src={user && user?.profilePic?.url}
                alt="."
                className="chatMenuFriendImg" />
            <span className="chatMenuFriendName">{user && user?.username}</span>
            <span onClick={deleteConversation} className='chatMenuDeleteIcon'><DeleteOutlineSharp style={{fontSize: '20px'}}/> </span>
        </div>
    )
}

export default Conversation
