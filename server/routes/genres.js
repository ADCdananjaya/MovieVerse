const express = require("express");
const router = express.Router();
const { Genres, validate } = require("../models/genre");
const auth = require("../middleware/authorization");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const genres = await Genres.find();
  res.status(200).json(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.status(200).json(genre);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = new Genres({
    name: req.body.name,
  });
  const result = await genre.save();
  res.status(201).json(result);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genres.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.status(200).json(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genres.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.status(200).json(genre);
});

module.exports = router;
