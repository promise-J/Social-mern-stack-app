import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Rightbar from '../rightbar/Rightbar'
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'
import './AllUsers.css'
import OneUser from './OneUser'

function AllUsers() {
  const history = useHistory()
  const auth = useSelector(state=> state.auth)
  const {user: currentUser} = auth
  const [followed, setFollowed] = useState()
  const [users, setUsers] = useState([])
  const [cb, setCb] = useState(false)
//   const [user, setUser] = useState('')
    
    // useEffect(()=>{
    //       const user = users.filter(user=> user._id === currentUser._id)
    //       setUser(user)
    // },[users, currentUser._id])
    
    useEffect(()=>{
       try {     
           const getUsers = async()=>{
               const res = await axios.get('/users/allUsers')
               setUsers(res.data.filter(user=> user._id !== currentUser?._id))
           }
           getUsers()
       } catch (error) {
           console.log(error)
       }
    },[currentUser._id])
    
    const addFriend = async()=>{
        try {
            await axios.post('/conversation', {members: [currentUser?._id, ]})
        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = async(user)=>{
        try {
            await axios.put(`/users/${user._id}/follow`, {userId: currentUser?._id});
            history.replace('allUsers')
            setFollowed(!followed)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
          <Topbar cb={cb} />
          <div className='allUsers'>
            <Sidebar />
            <div className="allUsers-wrapper">
                <h1>Getting started? Find friends</h1>
                {
                    users?.map(user=>(
                        <OneUser setCb={setCb} cb={cb} key={user._id} user={user} currentUser={currentUser} />
                    ))
                }
                  

                  
            </div>
            <Rightbar />
          </div>
        </div>
    )
}

export default AllUsers
