const Joi = require("joi");
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const genres = require("./data");
const validate = require("./validate");

app.use(express.json());

app.get("/api/genres", (req, res) => res.status(200).json(genres));

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g._id == req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.status(200).json(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    _id: genres.length,
    name: req.body.name,
  };
  genres.push(genre);
  res.status(201).json(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = genres.find((g) => g._id == req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  genre.name = req.body.name;
  res.status(200).json(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g._id == req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.findIndex((g) => g._id === genre._id);
  genres.splice(index, 1);
  res.status(200).json(genre);
});

app.listen(port, () => console.log(`App listen on port ${port}!`));
