import { combineReducers } from 'redux'
import auth from './authReducers'
import tokenReducer from './tokenReducer'
import posts from './postReducer'

export default combineReducers({
    auth,
    token: tokenReducer,
    posts
})
 