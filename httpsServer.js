const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { web3 } = require("./config/wsProvider");
const port = process.env.port || 8000;
const {newPurchasesSubscribe} = require("./functions/subscribeNewPurchases");

// Certificate
const key = fs.readFileSync(
  process.env.SSL_KEY,
  "utf8"
);
const cert = fs.readFileSync(
  process.env.SSL_CERT,
  "utf8"
);
const ca = fs.readFileSync(
  process.env.SSL_CA,
  "utf8"
);

const credentials = {
  key,
  cert,
  ca,
};

const httpsServer = https.createServer(credentials, app);

app.use(express.json());
app.use(cors());
app.use("/stadiums", require("./src/routes/stadiums.routes"));

newPurchasesSubscribe();

httpsServer.listen(port, () => {
  console.log(`HTTPS server on port ${port}`);
});

process.on("SIGINT", () => {
  web3.currentProvider.close;
  process.exit();
});
