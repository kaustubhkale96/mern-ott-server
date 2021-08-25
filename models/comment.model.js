const mongoose = require('mongoose');
const Schema = mongoose.Schema

const comment = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    username: {
        type: String,
        ref: 'user'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Videos'
    },
    comment: { type: String }
}, { timestamps: true })

const Comment = mongoose.model('Comment', comment);
module.exports = Comment;