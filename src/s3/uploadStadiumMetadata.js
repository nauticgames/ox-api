const buildMetadata = require("../../functions/buildMetadata");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const bucketName = process.env.AWS_BUCKET_NAME;
const s3 = require("../../config/s3");

async function uploadMetadata(id, type) {
  try {
    const metadata = buildMetadata(id, type);

    const filename = `${path.resolve("./")}/files/stadiums/${id}.json`;
    fs.writeFileSync(filename, JSON.stringify(metadata));

    const UploadParams = {
      Bucket: bucketName,
      Key: `${id}.json`,
      Body: JSON.stringify(metadata),
      ContentType: "application/json",
      Metadata: {
        "Content-Type": "application/json",
      },
    };

    await s3.putObject(UploadParams);

    console.log("Metadata uploaded");
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = { uploadMetadata };
