const router = require('express').Router()
const postCtrl = require('../controllers/post')
const isAuth = require('../middleware/auth')

//get a single post
router.get('/every', postCtrl.allPosts)
router.get('/:id', postCtrl.getPost)
router.post('/', isAuth, postCtrl.createPost)
router.put('/:id/like', postCtrl.likes)
router.get('/timeline/:userId', postCtrl.timeline) 
router.get('/profile/:username', postCtrl.userPost)
router.get('/poster/:userId', postCtrl.poster)
router.delete('/:id', postCtrl.deletePost)
router.put('/update/:id', postCtrl.updatePost)


module.exports = router