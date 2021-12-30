const router = require('express').Router()
const Comment = require('../models/comment')

router.post('/comment', async(req, res)=>{
  try {
      const {user, text, postId} = req.body
      if(!user || !text || !postId) return res.status(400).json('Cant create comment')
      
      const newComment = new Comment({user, text, postId})
      await newComment.save()
      res.status(200).json(newComment)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/comment/all/:postId', async(req, res)=>{
    try {
        const comments = await Comment.find({postId: req.params.postId})
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router