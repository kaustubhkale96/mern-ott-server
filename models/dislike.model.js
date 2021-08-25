const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dislikeVideo = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Videos'
    }
}, { timestamps: true })

const Dislike = mongoose.model('Dislike', dislikeVideo);
module.exports = Dislike;