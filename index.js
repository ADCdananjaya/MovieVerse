const Joi = require("joi");
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const genres = "./";

app.get("/api/genres", (req, res) => {});

app.listen(port, () => console.log(`App listen on port ${port}!`));
