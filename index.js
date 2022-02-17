const express = require("express");
const cors = require("cors");
const { web3 } = require("./config/wsProvider");
require("dotenv").config();
const port = process.env.port || 8000;
const app = express();
const { newPurchasesSubscribe } = require("./functions/subscribeNewPurchases");

app.use(express.json());
app.use(cors());
app.use("/stadiums", require("./src/routes/stadiums.routes"));

newPurchasesSubscribe();

app.listen(port, () => {
  console.log("Listen in", port);
});

process.on("SIGINT", () => {
  web3.currentProvider.close;
  process.exit();
});
