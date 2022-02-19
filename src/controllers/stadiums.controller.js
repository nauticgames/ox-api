const fs = require("fs");
require("dotenv").config();
const path = require("path");
const Web3 = require("web3");
const HTTPS_ENDPOINT = process.env.HTTPS_ENDPOINT;
const provider = new Web3.providers.HttpProvider(HTTPS_ENDPOINT);
const web3 = new Web3(provider);
const StadiumsABI = require("../../abi/Stadiums");
const buildMetadata = require("../../functions/buildMetadata");
const { uploadMetadata } = require("../s3/uploadStadiumMetadata");

const contract = new web3.eth.Contract(
  StadiumsABI,
  process.env.STADIUM_CONTRACT
);

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

exports.reSyncMetadata = async function (req, res) {
  const result = await contract.methods.totalSupply().call();

  const totalSupply = Number(result);

  const unSyncedTokens = [];

  for (let i = 1; i <= totalSupply; i++) {
    try {
      const filename = `${__dirname}/../../files/stadiums/${i}.json`;
      fs.readFileSync(filename);
    } catch {
      unSyncedTokens.push(i);
      continue;
    }
  }

  if (unSyncedTokens.length === 0) {
    return res.status(200).json({ code: 200, message: "Nothing to resync" });
  }

  for (let i = 0; i < unSyncedTokens.length; i++) {
    try {
      const id = unSyncedTokens[i];
      const type = await contract.methods.getStadiumType(id).call();

      const metadata = buildMetadata(id, type);

      const filename = `${path.resolve("./")}/files/stadiums/${id}.json`;
      fs.writeFileSync(filename, JSON.stringify(metadata));
      await uploadMetadata(id, type);
    } catch (error) {
      continue;
    }
  }

  return res
    .status(200)
    .json({ code: 200, message: "Metadatas synced successfully" });
};
