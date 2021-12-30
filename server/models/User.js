const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    followings: {
        type: Array,
        default: []
    },
    desc: {
        type: String,
        max: 50
    },
    followers: {
        type: Array,
        default: []
    },
    notifications: {
        type: Array,
        default: []
    },
    contact: {
        type: String
    },
    sex: {
        type: String
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    },
    city: {
        type: String,
        max: 50
    },
    hometown: {
        type: String,
        max: 50
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: Object,
        default: {
            url: "https://res.cloudinary.com/dfohdw1w8/image/upload/v1631448358/socialApp/pbcead0kj5ajcrqothx1.jpg",
            public_id: "socialApp/pbcead0kj5ajcrqothx1"
        }
    },
    coverPic: {
        type: Object,
        default: {
            url: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
            public_id: "socialApp/pbcead0kj5ajcrqothx1"
        }
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User

