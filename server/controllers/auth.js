const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {isEmail, isLength} = require('../utils/validators')


const authCtrl = {
    register: async(req, res)=>{
      try {
          const {password, username, email} = req.body
          if(!username || !email || !password) return res.status(400).json({msg: 'Fields must not be empty'})
          
          const emailExists = await User.findOne({email})
          const userExists = await User.findOne({username})
          if(!isEmail(email)) return res.status(400).json({msg: 'Email must be valid'})
          if(!isLength(password)) return res.status(400).json({msg: 'Password must be atleast 6 characters'})
 

          if(userExists) return res.status(400).json({msg: 'This Username already exists'})
          if(emailExists) return res.status(400).json({msg: 'This Email already exists'})

          const hashPassword = await bcrypt.hash(password, 10)
          const newUser = {email, username, password: hashPassword}
          await new User(newUser).save()
          res.status(200).json({msg: 'User created.'})

      } catch (error) {
         return res.status(500).json({msg: error.message})
      }
      


    },
    login: async(req, res)=> {
      try {
          const {email, password} = req.body
          if(!email || !password) return res.status(400).json({msg: 'Fields must not be empty'})
          const user = await User.findOne({email})
          

        if(!user) return res.status(400).json({msg: 'User does not exist'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg: 'Password is incorrect'})

        const refreshToken = createRefreshToken({id: user._id})
       
        res.cookie('refreshtoken', refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})

        res.status(200).json({msg: 'Login successful'})

      } catch (error) {
          return res.status(500).json({msg: error.message})
      }
     
    },
    getToken: async (req, res)=>{
        try {
            const refreshToken = req.cookies.refreshtoken
            const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
            const accessToken = createAccessToken({id: user.id})
            res.status(200).json(accessToken)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    logout: async (req, res)=> {
        try {
          res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
          return res.json({msg: 'Logged out'})
        } catch (error) {
          return res.status(500).json({msg: error.message})
        }
      },
    all: async (req, res)=>{
        const all = await User.find()
        res.json(all)
    }
}

const createAccessToken =  (payload)=>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '51m'})
}

const createRefreshToken = (payload)=>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: '7d'})
}




module.exports = authCtrl
