const mongoose = require("mongoose");

const { Schema } = mongoose;

const MissingSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Missing", MissingSchema);