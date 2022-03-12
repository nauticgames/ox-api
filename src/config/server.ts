import dotenv from "dotenv";
dotenv.config();

const MASTER_KEY = process.env.MASTER_KEY;
const SERVER_PORT = process.env.SERVER_PORT || 8080;
const AWS_STADIUMS_BUCKET_NAME =
  process.env.AWS_STADIUMS_BUCKET_NAME || "oxstadiums";
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const STADIUM_CONTRACT = process.env.STADIUM_CONTRACT;
const HTTPS_ENDPOINT = process.env.HTTPS_ENDPOINT;
const WS_ENDPOINT = process.env.WS_ENDPOINT;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

export default {
  master: MASTER_KEY,
  aws: {
    accessKeyId: AWS_ACCESS_KEY,
    stadiumsBucket: AWS_STADIUMS_BUCKET_NAME,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  port: SERVER_PORT,
  web3: {
    stadiumsContract: STADIUM_CONTRACT,
    endpoints: {
      https: HTTPS_ENDPOINT,
      ws: WS_ENDPOINT,
    },
  },
  db: {
    uri: MONGODB_URI,
  },
};
