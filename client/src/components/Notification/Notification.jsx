import { DeleteOutline } from '@material-ui/icons'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import Main from '../main/Main'
import Rightbar from '../rightbar/Rightbar'
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'
import './Notification.css'
import {useHistory} from 'react-router-dom'
import SingleNotification from './SingleNotification'

function Notification() {
    const history = useHistory()
    const user = useSelector(state=> state.auth)
    const {user: currentUser} = user    

    const deleteNotification = async()=>{
        const notif = await axios.delete(`/users/deleteNotification/${currentUser._id}`)
        history.replace('notifications')
        console.log(notif)
    }

    return (
        <div>
          <Topbar />
          <div className='notification'>
           <Sidebar />
           <div className="notification-wrapper">
               <h1>Notifications</h1>
               {
                   user?.user?.notifications?.length === 0 ? <h1>You do not have any Notifications</h1> :
                <>
               <div onClick={deleteNotification} className="deletePanel">
               <span>Clear All</span>
               <DeleteOutline style={{color: 'red', fontSize: '30px'}} />
               </div>
               {
                   user?.user?.notifications?.map(noti=>(
                     <SingleNotification key={noti} noti={noti} />
                   ))
               }
           </>
            }
           </div>
           <Rightbar />
          </div>
        </div>
    )
}

export default Notification
