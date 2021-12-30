const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    sender: {
        type: String
    },
    text: {
        type: String
    },
    conversationId: {
        type: String
    }
}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message


