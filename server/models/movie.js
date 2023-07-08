const mongoose = require("mongoose");
const Joi = require("joi");
const objectId = require("joi-objectid")(Joi);
const { genreSchema } = require("./genre");

const schema = new mongoose.Schema({
  title: { type: String, minlength: 2, maxlength: 50, required: true },
  description: { type: String, minlength: 10, maxlength: 255, required: true },
  genreId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  duration: { type: Number, required: true },
  rating: { type: Number, float: true, required: true },
  poster: { type: String, required: true },
});

const Model = mongoose.model("Movie", schema);

const validateMovies = (movie) => {
  const fileSchema = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
  });

  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required().label("Title"),
    description: Joi.string().min(10).max(255).required().label("Description"),
    genreId: objectId().required().label("Author"),
    duration: Joi.number()
      .integer()
      .required()
      .min(10)
      .max(1400)
      .label("Duration"),
    rating: Joi.number()
      .required()
      .precision(2)
      .positive()
      .min(0)
      .max(11)
      .label("Rating"),
    // poster: Joi.string().required().label("Poster"),
  });
  return schema.validate(movie);
};

exports.Movies = Model;
exports.validate = validateMovies;
