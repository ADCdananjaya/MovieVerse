const mongoose = require("mongoose");
const Joi = require("joi");

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

const Model = mongoose.model("User", schema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).max(30).required().label("Password"),
  });

  return schema.validate(user);
};

exports.User = Model;
exports.validate = validateUser;
