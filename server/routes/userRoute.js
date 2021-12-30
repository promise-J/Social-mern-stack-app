const router = require('express').Router()
const userCtrl = require('../controllers/user')
const isAuth = require('../middleware/auth')
const User = require('../models/User')


router.get('/', userCtrl.getUser)
router.get('/single', isAuth, userCtrl.userAuth)
router.get('/allUsers', userCtrl.getAllUsers)
router.get('/friends/:userId', userCtrl.getFriends)
router.delete('/deleteNotification/:userId', userCtrl.deleteNotification)
router.put('/:id', isAuth, userCtrl.updateUser)
router.delete('/:id', isAuth, userCtrl.deleteUser)
router.put('/:id/follow', userCtrl.followUser)
// router.put('/:id/unfollow', userCtrl.unFollowUser)

module.exports = router


