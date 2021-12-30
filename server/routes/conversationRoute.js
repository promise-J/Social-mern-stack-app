const isAuth = require('../middleware/auth')
const Conversation = require('../models/conversation')
const User = require('../models/conversation')
const router = require('express').Router()

//a conversation is the chat established between two users.
//create a conversation.
router.post('/conversation', async(req, res)=>{
    try {
        const exists = await Conversation.find({members: {$all: [req.body.senderId, req.body.recieverId]}})
        if(!req.body.senderId || !req.body.recieverId) return res.status(400).json('Members must be present')

        if(exists.length!==0) return res.status(400).json('Already Friends')
    //         if(user.followers.includes(req.body.userId)){

        const newConversation = {
            members: [req.body.senderId, req.body.recieverId]
        }
        const savedConversation = await new Conversation(newConversation).save()
        res.status(200).json('Conversation Created.')
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.delete('/conversation/:id', async(req, res)=>{
    try {
        const exist = await Conversation.findById(req.params.id)
        if(!exist) return res.status(400).json('Conversation not Found')
        return res.status(200).json(exist)
        // await Conversation.findByIdAndDelete(req.params.id)
        // return res.status(200).json('Conversation deleted')
    } catch (error) {
        return res.status(500).json(error)
    }
    
})

//get conversation
router.get('/conversation/:userId', async(req, res)=>{
    try {
        const conversation = await Conversation.find({
            members: {
                $in: [req.params.userId]
            }
        })
        res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router
