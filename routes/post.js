let mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'  // This should refer to your User model
    },
    image: String,
    posttitel: String,
    caption: String,
    date: {
        type: Date,
        default: Date.now  // Correct way to set default date
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'  // This should also refer to your User model
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'  // This should refer to your User model
    }]
});

module.exports = mongoose.model('post', postSchema);
