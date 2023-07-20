const express = require("express");
const util = require("util");
const router = express.Router();
const { Movies, validate } = require("../models/movie");
const upload = require("../utils/fileUpload");
const auth = require("../middleware/authorization");
const admin = require("../middleware/admin");

router.use("/posters", express.static("images"));

router.get("/", async (req, res) => {
  const movies = await Movies.find();
  res.status(200).json(movies);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movies.findById(id);
  if (!movie) return res.status(400).send("Movie id is not valid!");
  res.status(200).json(movie);
});

router.post("/", [auth, admin], upload.single("file"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await new Movies({
    ...req.body,
    poster: req.file.filename,
  }).save();
  res.status(201).json(movie);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movies.findByIdAndUpdate(
    req.params.id,
    { ...req.body, poster: req.file.filename },
    { new: true }
  );
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.status(201).json(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const id = req.params.id;
  const movie = await Movies.findByIdAndDelete(id);
  if (!movie) return res.status(404).send("Movie Id is not valid!");
  res.status(200).json(movie);
});

module.exports = router;
