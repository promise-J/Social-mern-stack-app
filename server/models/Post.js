const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: Object
    },
    like: {
        type: Array,
        default: []
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post


