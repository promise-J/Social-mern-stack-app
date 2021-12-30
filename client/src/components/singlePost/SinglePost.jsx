import React from 'react'
import { useLocation } from 'react-router'
import Main from '../main/Main'
import Rightbar from '../rightbar/Rightbar'
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'

const SinglePost = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]

    return (
        <>
        <Topbar />
        <div style={{padding: '20px 15rem', overflow: 'hidden'}} className='home'>
           {/* <Sidebar /> */}
           <Main style={{flex: '1'}} SinglePostId={id} />
           {/* <Rightbar /> */}
        </div>
        </>
    )
}

export default SinglePost
