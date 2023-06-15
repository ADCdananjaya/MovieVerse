const express = require("express");
const router = express.Router();
const genres = require("../data");
const validate = require("../validate");

router.get("/", (req, res) => res.status(200).json(genres));

router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g._id == req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.status(200).json(genre);
});

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    _id: genres.length,
    name: req.body.name,
  };
  genres.push(genre);
  res.status(201).json(genre);
});

router.put("/:id", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = genres.find((g) => g._id == req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  genre.name = req.body.name;
  res.status(200).json(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g._id == req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.findIndex((g) => g._id === genre._id);
  genres.splice(index, 1);
  res.status(200).json(genre);
});

module.exports = router;
