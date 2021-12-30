const router = require('express').Router()
const authCtrl = require('../controllers/auth')
const adminAuth = require('../middleware/adminAuth')
const isAuth = require('../middleware/auth')

router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.get('/logout', authCtrl.logout)
router.post('/refresh_token', authCtrl.getToken)
router.get('/all', isAuth, adminAuth, authCtrl.all)

module.exports = router