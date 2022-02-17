const fs = require("fs");

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
