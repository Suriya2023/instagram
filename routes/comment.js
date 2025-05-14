const mongoose = require('mongoose')
 


let userComment = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    comment: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('comment', userComment)