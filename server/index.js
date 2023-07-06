const express = require("express");
require("dotenv").config();
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

app.listen(port, () => console.log(`App listen on port ${port}!`));
