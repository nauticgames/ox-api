const { web3 } = require("../config/wsProvider");
require("dotenv").config();
const { uploadMetadata } = require("../src/s3/uploadStadiumMetadata");
const NewPurchaseABI = require("../abi/NewPurchase");

const NewPurchaseOptions = {
  address: process.env.STADIUM_CONTRACT,
  topics: [
    "0x601b1436f030dd3eb27ee5595ecf2a29c25f1e4202ab289a729828d4128098fd",
  ],
};

const newPurchasesSubscribe = function () {
  web3.eth
    .subscribe("logs", NewPurchaseOptions, () => {
      null;
    })
    .on("data", async function (transactionHash) {
      const { stadiumId, stadiumType } = await web3.eth.abi.decodeParameters(
        NewPurchaseABI,
        transactionHash.data
      );

      await uploadMetadata(stadiumId, stadiumType);
    })
    .on("connected", async function (connection) {
      console.log("Connected:", connection);
    })
    .on("close", (err) => {
      console.error(
        `WebSocket connection closed. Error code ${err.code}, reason "${err.reason}"`
      );
    })
    .on("error", function (err) {
      connect();
      console.log(err);
    });
};

module.exports = { newPurchasesSubscribe };
