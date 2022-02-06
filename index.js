const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.port || 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/stadiums", require("./src/routes/stadiums.routes"));

app.listen(port, () => {
  console.log("Listen in", port);
});
