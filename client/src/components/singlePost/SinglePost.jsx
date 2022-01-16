import React from 'react'
import { useLocation } from 'react-router'
import Main from '../main/Main'
import Rightbar from '../rightbar/Rightbar'
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'
import './singlepost.css'

const SinglePost = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]

    return (
        <>
        <Topbar />
        <div style={{overflow: 'hidden'}} className='single'>
           <Main style={{width: '100vw', padding: '10px', background: 'black'}} SinglePostId={id} edit />
        </div>
        </>
    )
}

export default SinglePost
