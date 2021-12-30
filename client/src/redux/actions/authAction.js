import axios from "axios"
import ACTIONS from "./index"


export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const dispatchLogout = ()=> {
    return {
        type: ACTIONS.LOGOUT
    }
}

export const fetchUser = async (token)=> {
    const res = await axios.get('/users/single', { 
        headers: {Authorization: token}
    })
    // console.log(res)
    return res
}

export const dispatchUser = (res)=> {
    // console.log(res.data.role)
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.isAdmin
        },
    }
}

