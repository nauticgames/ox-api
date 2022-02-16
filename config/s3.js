const { S3 } = require("@aws-sdk/client-s3");
require("dotenv").config();

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

module.exports = s3;
