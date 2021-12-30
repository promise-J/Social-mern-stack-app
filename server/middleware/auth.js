const jwt = require('jsonwebtoken')

const isAuth = async(req, res, next)=>{
    const token = req.header('Authorization')
    if(!token){
        return res.status(400).json({msg: 'Invalid Authorization'})
    }
    try {      
        const user = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = user.id
        next()
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = isAuth