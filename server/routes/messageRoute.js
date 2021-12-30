const Message = require('../models/message')
const router = require('express').Router()

//message is the content of a chat
//create a new message
router.post('/message', async(req, res)=>{
    try {
        const savedMessage = await new Message(req.body).save()
        res.status(200).json(savedMessage)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//GET message
router.get('/message/:conversationId', async(req, res)=>{
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router
