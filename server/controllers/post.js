const Post = require('../models/Post')
const User = require('../models/User')

const postCtrl = {
    getPost: async(req, res)=>{
        try {
            const post = await Post.findById(req.params.id)
            return res.status(200).json(post)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createPost: async(req, res)=>{
        try {
            const post = await Post({userId: req.user, ...req.body}).save()
           return res.status(200).json(post)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updatePost: async(req, res)=>{
      try {
          const post = await Post.findById(req.params.id)
          if(post.userId===req.body.userId){
              await post.updateOne({$set: req.body})
              res.status(200).json({msg: 'Post updated'})
          }else{
              return res.status(400).json({msg: 'You can only update your post'})
          }
      } catch (error) {
          return res.status(500).json({msg: error.message})
      }
    },
    deletePost: async(req, res)=>{
        try {
            const post = await Post.findById(req.params.id)
            if(!post) return res.status(400).json({msg: 'Post not found'})
            if(post.userId===req.query.userId){
                await post.deleteOne()
                console.log('the same bro', req.query.userId)
                res.status(200).json({msg: 'Post deleted'})
            }else{
                console.log('not the same bro', req.query.userId)
                return res.status(400).json({msg: 'You can only delete your post'})
            }
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    //like and unlike
    likes: async(req, res)=>{
        try {
            const post = await Post.findById(req.params.id)
            if(post.like.includes(req.body.userId)){
                await post.updateOne({$pull: {like: req.body.userId}})
                return res.status(200).json({msg: 'You unliked this post'})
            }else{
                await post.updateOne({$push: {like: req.body.userId}})
                return res.status(200).json({msg: 'You liked this post'})
            }
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    poster: async(req, res)=>{
        try {
            const user = await User.findOne({_id: req.params.userId})
            res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    userPost: async(req, res)=>{
        try {
            const username = req.params.username
            const user = await User.findOne({username})
            const userPosts = await Post.find({userId: user._id})
            res.status(200).json(userPosts)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    
    //all timelines
    timeline: async(req, res)=>{
        try {
            const currentUser = await User.findById(req.params.userId)
            const userPosts = await Post.find({userId: currentUser._id})

                const friendsPost = await Promise.all(currentUser.followings.map(friendId=>{
                    return Post.find({userId: friendId})
                    })
                )
            // res.json(userPosts.concat(...friendsPost))
            res.status(200).json(userPosts.concat(...friendsPost))
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    allPosts: async(req, res)=>{
        try {
            const posts = await Post.find()
            res.status(200).json(posts)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = postCtrl