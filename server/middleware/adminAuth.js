const User = require("../models/User")


const adminAuth = async (req, res, next)=>{
   const user = await User.findById(req.user)
   if(!user.isAdmin) return res.status(400).json({msg: 'Admin Access Only'})
   next()

}

module.exports = adminAuth