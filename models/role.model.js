const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
});

schema.method("toJSON", function () {
  const { _v, _id, ...object } = this.object();
  object.id = _id;
  return object;
});

const Role = mongoose.model("Role", schema);
module.exports = Role;
