const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    pattern: /.*@.*/,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Model = mongoose.model("Customer", schema);

module.exports = Model;
