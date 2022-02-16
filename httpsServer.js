const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./functions/subscribeNewPurchases");
const port = process.env.port || 8000;

// Certificate
const key = fs.readFileSync(
  "/etc/letsencrypt/live/api.oxsoccer.com/privkey.pem",
  "utf8"
);
const cert = fs.readFileSync(
  "/etc/letsencrypt/live/api.oxsoccer.com/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/api.oxsoccer.com/chain.pem",
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

httpsServer.listen(port, () => {
  console.log(`HTTPS server on port ${port}`);
});
