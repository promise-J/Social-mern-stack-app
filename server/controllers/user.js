const User = require("../models/User")
const bcrypt = require('bcrypt')
const { findByIdAndUpdate } = require("../models/User")


const userCtrl = {
    //update user
    updateUser: async(req, res)=>{
        // const user = await User.findById(req.params.id)
        // if(!user) return res.json({msg: 'User not found'})
        // const userId = req.params.id
        if(req.params.id===req.user || req.user.isAdmin){
          if(req.body.password){
              try {
                  req.body.password = await bcrypt.hash(req.body.password, 10)
              } catch (error) {
                  return res.status(400).json({msg: error.message})
              }
          }
          try {
              await User.findByIdAndUpdate(req.params.id, {$set: req.body})
              res.json({msg: 'User updated.'})
          } catch (error) {
              res.status(500).json({msg: error.message})
          }
        }else{
            res.status(500).json({msg: 'You are not allowed'})
        }
    },
    // delete user
    deleteUser: async(req, res)=>{
        if(req.params.id===req.user || req.user.isAdmin){
            try {
                await User.findByIdAndDelete(req.params.id)
                res.json({msg: 'User Deleted.'})
            } catch (error) {
                res.status(500).json({msg: error.message})
            }
          }else{
              res.status(500).json({msg: 'You are not allowed'})
          }
    },
    // follow user
    followUser: async(req, res)=>{
        try {
            if(req.params.id === req.body.userId) return res.status(400).json({msg: 'You cannot follow your self'})
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: currentUser._id}})
                await currentUser.updateOne({$push: {followings: user._id}, $push: {notifications: `${user.username} started following you. Appreciate their followership`}})
                return res.status(200).json({msg: `You followed ${user.username}`})
            }else{
                await user.updateOne({$pull: {followers: currentUser._id}})
                await currentUser.updateOne({$pull: {followings: user._id}, $push: {notifications: `${user.username} unfollowed you. Relax it happens`}})
                return res.status(200).json({msg: `You unfollowed ${user.username}`})
                // return res.status(400).json({msg: `You already follow ${user.username}`})
            }
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }

    },
    //unfollow user
    // unFollowUser: async(req, res)=>{
    //     try {
    //         if(req.params.id === req.body.userId) return res.status(400).json({msg: 'You cannot unfollow your self'})
    //         const user = await User.findById(req.params.id)
    //         const currentUser = await User.findById(req.body.userId)
    //         if(user.followers.includes(req.body.userId)){
    //             await user.updateOne({$pull: {followers: req.body.userId}})
    //             await currentUser.updateOne({$pull: {followings: req.params.id}, $push: {notifications: `${currentUser.username} unfollowed you. Relax it happens`}})
    //             return res.status(200).json({msg: `You unfollowed ${user.username}`})
    //         }else{
    //             return res.status(400).json({msg: `You do not follow ${user.username}`})
    //         }
    //     } catch (error) {
    //         return res.status(500).json({msg: error.message})
    //     }
    // },
    userAuth: async(req, res)=>{
        try {
            const user = await User.findById(req.user)
            res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getUser: async(req, res)=>{
        try {  
            const username = req.query.username
            const userId = req.query.userId   
            const user = userId ? await User.findById(userId) : await User.findOne({username})
            const {password, createdAt, ...other} = user._doc
            return res.status(200).json(other)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getFriends: async(req, res)=>{
        try {
            const user = await User.findById(req.params.userId);
            const friends = await Promise.all(
              user.followings.map((friendId) => {
                return User.findById(friendId);
              })
            );
            let friendList = [];
            friends.map((friend) => {
              const { _id, username, profilePicture } = friend;
              friendList.push({ _id, username, profilePicture });
            });
            res.status(200).json(friendList)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getAllUsers: async(req, res)=>{
        try {
            const users = await User.find({})
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteNotification: async(req, res)=>{
        try {
            const user = await User.findById(req.params.userId)
            user.updateOne({},{$set: {"notifications": []}}, {multi: true})
            res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = userCtrl