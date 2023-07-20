const express = require("express");
const router = express.Router();
const { Customers, validate } = require("../models/customer");

router.get("/", async (req, res, next) => {
  try {
    const customers = await Customers.find().select("-password");
    res.status(200).json(customers);
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const customer = await Customers.findById(req.params.id).select(
      "-password"
    );
    if (!customer)
      return res.status(404).send("Customer with the given ID was not found.");

    res.status(200).json(customer);
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = new Customers({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const { email, name, date } = await customer.save();
    res.status(201).json({ name, email, date });
  } catch (ex) {
    next(ex);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customers.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).select("-password");
    if (!customer)
      return res.status(404).send("Customer with the given ID was not found.");
    res.status(200).json(customer);
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const customer = await Customers.findByIdAndDelete(req.params.id).select(
      "-password"
    );
    if (!customer)
      return res.status(404).send("Customer with the given ID was not found.");
    res.status(200).json(customer);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
