let mongoose = require('mongodb')

let postSchema = new mongoose.schema({

    user: {
        type: mongoose.schema.Types.objectId,
        ref: 'user'
    },
    image: String,
    posttitel: String,
    caption: String,
    date: {
        type: Date,
        default: Date.new()
    },
    comment: [{
        type: mongoose.schema.Types.objectId,
        ref: 'user'
    }],
    likes: [{
        type: mongoose.schema.Types.objectId,
        ref: 'user'
    }],


})

mondule.exports = mongoose.model('post', postSchema)