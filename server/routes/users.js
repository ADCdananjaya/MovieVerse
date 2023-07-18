const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validate } = require("../models/user");

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(400).send("User id is not valid!");
    const { _id, name, email, date } = user;
    res.status(200).json({ _id, name, email, date });
  } catch (ex) {
    res.status(400).send("Somthing went wrong!");
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered!");

  const salt = await bcrypt.genSalt(8);
  const password = await bcrypt.hash(req.body.password, salt);

  user = await new User({
    name: req.body.name,
    email: req.body.email,
    password,
  }).save();

  const { _id, name, email, date } = user;
  res.status(201).json({ _id, name, email, date });
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    const id = req.params.id;
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(8);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        password,
      },
      { new: true }
    ).select("-password");
    if (!user)
      return res.status(404).send("User with the given ID was not found.");
    res.status(200).json(user);
  } catch (ex) {
    res.status(400).send("Something went wrong!");
  }
});

module.exports = router;