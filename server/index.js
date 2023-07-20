const express = require("express");
require("dotenv").config();
require("./db/mongoose");
require("express-async-errors");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

app.listen(port, () => console.log(`App listen on port ${port}!`));
