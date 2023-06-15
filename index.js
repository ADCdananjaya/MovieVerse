const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const genres = require("./routes/genres");

app.use(express.json());
app.use("/api/genres", genres);

app.listen(port, () => console.log(`App listen on port ${port}!`));
