import './register.css'
import Topbar from '../topbar/Topbar'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {CircularProgress} from '@material-ui/core'

const initialState = {
    username: '',
    email: '',
    password: '',
    cf_password: '',
    error: ''
}

function Login(props) {
    const [user, setUser] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const {email, username, password, cf_password, error} = user
    const history = useHistory()

    const handleChange = (e)=>{
        const {value, name} = e.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!password || !email || !username){
            setUser({...user, error: 'Fields must not be empty.'})
           return setTimeout( ()=>setUser({...user, error: ""}),[3000]) 
        }
        if(password.length < 6){
            setUser({...user, error: 'Password must be atleast 6 characters.'})
            return setTimeout( ()=>setUser({...user, error: ""}),[3000]) 
        }
        if(cf_password !== password){
            setUser({...user, error: 'Passwords do not match.'})
            return setTimeout( ()=>setUser({...user, error: ""}),[3000]) 
        }
            
        try {
            setLoading(true)
            await axios.post('/auth/register', {email, password, username})
            history.push('/login')
        } catch (error) {
            if(error.response.data){
                setUser({...user, error: error.response.data.msg})
                return setTimeout( ()=>{
                    setLoading(false)
                    setUser({...user, error: ""})
                },[3000]) 
            }
        }
        setLoading(false)
    }

    return (
        <div className='register'>
            <div className="registerLeft">
                <h2>G-STAR</h2>
                <img 
                src="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
                 alt="" className="registerImg" />
            </div>
            <div className="registerRight">
                <form className='registerForm' onSubmit={handleSubmit}>
                <h4 className='registerHead'>Register Now</h4>
                   {error && <span style={{color: 'red', fontSize: '17px'}}>{error}</span>}
                    <input onChange={handleChange} value={username} name='username' type="text" className="registerInput" placeholder='Username here' />
                    <input onChange={handleChange} value={email} name='email' type="email" className="registerInput" placeholder='Email here' />
                    <input onChange={handleChange} value={password} name='password' type="password" className="registerInput" placeholder='Password here' />
                    <input onChange={handleChange} value={cf_password} name='cf_password' type="password" className="registerInput" placeholder='Confirm Password here' />
                    <button className='registerButton' type='submit'>{loading ? <CircularProgress style={{color: 'white'}} /> : 'Register'}</button>
                    <p className='registerAccountCheck'>Don't have an account yet?</p>
                    <Link className='registerLoginButton' to='/login' type='submit'>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
