const mongoose = require("mongoose");

const schema = mongoose.Schema({
    category: String,
});

schema.method("toJSON", function () {
    const { _v, _id, ...object } = this.object();
    object.id = _id;
    return object;
});

const Category = mongoose.model("Category", schema);
module.exports = Category;
