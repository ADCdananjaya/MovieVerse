const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
    lowercase: true,
  },
});

const Model = mongoose.model("Genre", schema);

module.exports = Model;
