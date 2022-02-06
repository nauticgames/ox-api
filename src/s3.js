const { S3 } = require("@aws-sdk/client-s3");
require("dotenv").config();
const fs = require("fs");

const bucketName = "oxstadiums";
const region = "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function uploadFile(id, file) {
  const UploadParams = {
    Bucket: bucketName,
    Key: `${id}.json`,
    Body: JSON.stringify(file),
    ContentType: "application/json",
    Metadata: {
      "Content-Type": "application/json",
    },
  };
  const data = await s3.putObject(UploadParams);
  return data;
}

exports.uploadFile = uploadFile;
