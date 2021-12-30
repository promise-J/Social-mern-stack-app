import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Messenger from './components/messenger/Messenger'
import Profile from './components/profile/Profile'
import Register from './components/register/Register'
import Landing from './components/Landing'
import Notification from './components/Notification/Notification'
import { dispatchLogin, dispatchUser, fetchUser } from './redux/actions/authAction'
import AllUsers from './components/AllUsers/AllUsers'
import SinglePost from './components/singlePost/SinglePost'
// import { dispatchPosts, fetchPosts } from './redux/actions/postAction'


function App() {
    const dispatch = useDispatch()
    const {token} = useSelector(state=> state.token)
    const user = useSelector(state=> state.auth)

    useEffect(()=>{
       const firstLogin = localStorage.getItem('firstLogin')
       if(firstLogin){
           try {
               const getToken = async()=>{
                  const res = await axios.post('/auth/refresh_token', null)
                  dispatch({type: 'GET_TOKEN', payload: res.data})
               }
               getToken()
           } catch (error) {
               console.log(error.response.data.msg)
           }
       }
    },[dispatch, user.isLogged])

    useEffect(()=>{
        // const firstLogin = localStorage.getItem('firstLogin')
      if(token){
          const getUser = async()=>{
              dispatch(dispatchLogin())
             return fetchUser(token).then(res=>{
                 dispatch(dispatchUser(res))
             })
          }
          getUser()
      }
    },[token, dispatch])

    // useEffect(()=>{
    //         const getPosts = ()=>{
    //             return fetchPosts(token).then(res=> dispatch(dispatchPosts(res)))
    //         }
    //         getPosts()
    //   },[token, dispatch])
    // 

    return (
        <div className='App'>
            <Router>
                <Redirect to={user.isLogged ? '/home' : '/'} />
                <Switch>
                    <Route exact path='/profile/:username' >
                        <Profile />
                    </Route>
                    <Route exact path='/'>
                        <Landing />
                    </Route>
                    <Route exact path='/messenger' >
                        <Messenger />
                    </Route>
                    <Route exact path='/home'>
                        <Home />
                    </Route>
                    <Route exact path='/post/:id'>
                        <SinglePost />
                    </Route>
                     <Route exact path='/register'>
                        <Register />
                    </Route>
                    <Route exact path='/login' >
                        <Login />
                    </Route>
                    <Route exact path='/notifications'>
                       <Notification />
                    </Route>
                    <Route exact path='/allUsers'>
                       <AllUsers />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
