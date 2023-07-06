const mongoose = require("mongoose");
const Joi = require("joi");

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

const validateGenres = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required().label("Name"),
  });

  return schema.validate(genre);
};

exports.Genres = Model;
exports.validate = validateGenres;
exports.genreSchema = schema;
