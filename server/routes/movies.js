const express = require("express");
const util = require("util");
const router = express.Router();
const { Movies, validate } = require("../models/movie");
const upload = require("../utils/fileUpload");
const auth = require("../middleware/authorization");
const admin = require("../middleware/admin");

router.use("/posters", express.static("images"));

router.get("/", async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(200).json(movies);
  } catch (ex) {
    res.send(404).send("Movies not found!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movies.findById(id);
    if (!movie) return res.status(400).send("Movie id is not valid!");
    res.status(200).json(movie);
  } catch (ex) {
    res.status(400).send("Something went wrong!");
  }
});

router.post("/", [auth, admin], upload.single("file"), async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await new Movies({
      ...req.body,
      poster: req.file.filename,
    }).save();
    res.status(201).json(movie);
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Somthing went wrong!");
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  try {
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
  } catch (ex) {
    res.status(400).send("Somthing went wrong!");
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movies.findByIdAndDelete(id);
    if (!movie) return res.status(404).send("Movie Id is not valid!");
    res.status(200).json(movie);
  } catch (ex) {
    res.status(400).send("Something went wrong!");
  }
});

module.exports = router;
