const { uploadFile } = require("../s3/uploadStadiumMetadata");
const { stadiumNames } = require("../utils/stadiumTypes");
const fs = require("fs");
const path = require("path");

exports.uploadMetadata = async function (req, res) {
  const { object } = req.body;
  const { secretkey } = req.headers;

  if (typeof object === "undefined") {
    return res.status(400).json({ code: 400, message: "Invalid parameters" });
  }

  if (typeof object.confirmed === "undefined") {
    return res
      .status(400)
      .json({ code: 400, message: "Transaction not confirmed" });
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
    image: `https://marketplace.oxsoccer.com/assets/img/${stadiumName.toLowerCase()}.png`,
    attributes: [
      {
        trait_type: "Stadium Type",
        value: stadiumName,
      },
    ],
  };

  const filename = `${path.resolve("./")}/files/stadiums/${id}.json`;

  try {
    fs.writeFileSync(filename, JSON.stringify(metadataInfo));
    const result = await uploadFile(id, metadataInfo);

    return res.status(200).json({ message: "File upload succesfully", result });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getMetadata = async function (req, res) {
  const id = req.params.id;

  const filename = `${__dirname}/../../files/stadiums/${id}.json`;

  try {
    const path = fs.readFileSync(filename);
    const metadata = JSON.parse(path);
    return res.status(200).json(metadata);
  } catch (error) {
    return res.status(401).json({ code: 401, message: "Asset not found" });
  }
};
