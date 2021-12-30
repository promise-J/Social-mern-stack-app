const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user: {
        type: Object
    },
    text: {
        type: String
    },
    postId: {
        type: String
    }
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment


