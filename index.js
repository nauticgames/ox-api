const express = require("express");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();
const port = process.env.port || 8000;
const app = express();
const { uploadFile } = require("./src/s3");

app.use(express.json());
app.use(cors());

const stadiumNames = ["Moon", "Mars", "Chaos"];

app.post("/hola", async (req, res) => {
  const { object } = req.body;
  const { secretkey } = req.headers;

  if (typeof object === "undefined") {
    return res.status(400).json({ code: 400, message: "Invalid parameters" });
  }

  if (typeof secretkey === "undefined") {
    return res.status(401).json({ code: 401, message: "Missing secret key" });
  }

  if (secretkey !== process.env.secretkey) {
    return res.status(401).json({ code: 401, message: "Invalid secret key" });
  }

  const id = parseInt(object.stadiumId);
  const stadiumType = object.stadiumType;
  const stadiumName = stadiumNames[stadiumType];

  const metadataInfo = {
    itemId: id,
    name: `${stadiumName} Stadium #${id}`,
    description: "OX Soccer Stadiums",
    external_url: "https://marketplace.oxsoccer.com/",
    image:
      "https://marketplace.oxsoccer.com/assets/img/" +
      stadiumName.toLowerCase() +
      ".png",
    attributes: [
      {
        trait_type: "Stadium Type",
        value: stadiumName,
      },
    ],
  };

  const filename = __dirname + `/files/stadiums/${id}.json`;

  fs.writeFileSync(filename, JSON.stringify(metadataInfo));

  try {
    const result = await uploadFile(id, metadataInfo);

    return res.status(200).json({ message: "File upload succesfully", result });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/files/stadiums/:id", (req, res) => {
  const id = req.params.id;

  const filename = `${__dirname}/files/stadiums/${id}.json`;

  try {
    const path = fs.readFileSync(filename);
    const metadata = JSON.parse(path);
    return res.status(200).json(metadata);
  } catch (error) {
    return res.status(401).json({ code: 401, message: "Asset not found" });
  }
});

app.listen(port, () => {
  console.log("Listen in", port);
});
