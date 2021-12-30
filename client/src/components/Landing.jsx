import React from 'react'
import './home/home.css'
import {Link} from 'react-router-dom'


const Landing = () => {
    const LandingImg = 'http://localhost:3000/images/landingPage.png'
    return (
        <div className='landing'>
            <div className='landing-img-container'>
                <img src={LandingImg} alt='none' />
            </div>
            <div className='landing-content'>
                <div className='landing-wrapper'>
                 <h1 style={{background: '#eee', width: 'fit-content', margin: '10px auto', color: 'blue'}}>G-STAR</h1>
                 <h1>CONNECT WITH FRIENDS</h1>
                 <Link style={{background: 'teal', padding: '12px', color: 'white'}} to='/login'>Login Now</Link>
                </div>
            </div>
        </div>
    )
}

export default Landing
