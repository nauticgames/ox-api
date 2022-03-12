import { S3 } from "@aws-sdk/client-s3";
import config from "../config/server";

const region = "us-east-1";
const accessKeyId = config.aws.accessKeyId;
const secretAccessKey = config.aws.secretAccessKey;

const s3 = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export default s3;
