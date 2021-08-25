const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.videos = require("./videos.model");
db.comments = require("./comment.model");
db.category = require("./category.videos.model");
db.like = require("./likes.model");
db.dislike = require("./dislike.model");
db.url = dbConfig.url;

db.ROLES = ["user", "admin"];
module.exports = db;
