const Joi = require("joi");

const validateGenres = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required().label("Name"),
  });

  return schema.validate(genre);
};

module.exports = validateGenres;
