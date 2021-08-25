const mongoose = require("mongoose");

const schema = mongoose.Schema({
    video_id: String,
    title: String,
    description: String,
    thumbnail: String,
    category: String,
});

const Videos = mongoose.model("Videos", schema);
module.exports = Videos;
