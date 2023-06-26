const Joi = require("joi");

const validateCustomers = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).max(30).required().label("Password"),
  });

  return schema.validate(customer);
};

module.exports = validateCustomers;
