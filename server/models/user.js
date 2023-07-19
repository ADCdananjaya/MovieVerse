const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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
  isAdmin: {
    type: Boolean,
  },
});

schema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

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
