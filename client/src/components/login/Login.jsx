import './login.css'
import Topbar from '../topbar/Topbar'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {CircularProgress} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {dispatchLogin} from '../../redux/actions/authAction'


const initialState = {
    email: '',
    password: '',
    error: ''
}

function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(initialState)
    const {email, password, error} = user

    const handleSubmit = async (e)=>{
      e.preventDefault()
      setLoading(true)
      try {
          const res = await axios.post('/auth/login', {email, password})
          localStorage.setItem('firstLogin', true)
          dispatch(dispatchLogin())
          history.push('/home')
        //   console.log(res)
      } catch (error) {
          error?.response && setUser({...user, error: error.response.data.msg})
      }
      setLoading(false)
    }

    const handleChange = (e)=>{
        const {value, name} = e.target
        setUser({...user, [name]: value})
    }

    return (
        <div className='login'>
            <div className="loginLeft">
                <h2>G-STAR</h2>
                <img 
                src="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300"
                 alt="" className="loginImg" />
            </div>
            <div className="loginRight">
                
                <form onSubmit={handleSubmit} className='loginForm'>
                <h4 className='loginHead'>Login Now</h4>
                    {error && <span style={{color: 'red', fontSize: '17px'}}>{error}</span>}
                    <input onChange={handleChange}
                     name='email' value={email} type="email"
                      className="loginInput" placeholder='Email here' />
                    <input onChange={handleChange}
                     name='password' value={password} type="password"
                      className="loginInput" placeholder='Password here' />
                    <button className='loginButton' type='submit'>
                        {loading ? <CircularProgress style={{color: 'white'}} /> : 'Login' }</button>
                    <p className='loginAccountCheck'>Don't have an account yet?</p>
                    <Link className='loginRegisterButton' to='/register' type='submit'>Register</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
