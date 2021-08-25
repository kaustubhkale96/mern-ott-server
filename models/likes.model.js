const mongoose = require('mongoose');
const Schema = mongoose.Schema

const likeVideo = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Videos'
    }
}, { timestamps: true })

const Like = mongoose.model('Like', likeVideo);
module.exports = Like;