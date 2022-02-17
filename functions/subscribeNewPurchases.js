const { web3 } = require("../config/wsProvider");
const { uploadMetadata } = require("../src/s3/uploadStadiumMetadata");

const NewPurchaseOptions = {
  address: "0xa320d1589334c0a12a3f971aafbbf21bf62c49ba",
  topics: [
    "0x601b1436f030dd3eb27ee5595ecf2a29c25f1e4202ab289a729828d4128098fd",
  ],
};

const NewPurchaseABI = [
  {
    indexed: false,
    internalType: "uint256",
    name: "stadiumId",
    type: "uint256",
  },
  {
    indexed: false,
    internalType: "uint8",
    name: "stadiumType",
    type: "uint8",
  },
];

const newPurchasesSubscribe = function () {
  web3.eth
    .subscribe("logs", NewPurchaseOptions, (err, result) => {
      console.log(err, result);
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
