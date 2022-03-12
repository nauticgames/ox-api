import { NewPurchaseABI } from "../ABI";
import server from "../config/server";
import { UploadStadiumMetadata } from "../s3/UploadMetadata";
import { wsInstance } from "../config/web3";

const SubscriptionOptions = {
  address: server.web3.stadiumsContract,
  topics: [
    "0x601b1436f030dd3eb27ee5595ecf2a29c25f1e4202ab289a729828d4128098fd",
  ],
};

const subscribe = function () {
  wsInstance.eth
    .subscribe("logs", SubscriptionOptions, () => {
      null;
    })

    .on("data", async function (transactionHash) {
      const { stadiumId, stadiumType } =
        await wsInstance.eth.abi.decodeParameters(
          NewPurchaseABI,
          transactionHash.data
        );

      await UploadStadiumMetadata(stadiumId, stadiumType);
    })

    .on("connected", async function (connection) {
      console.log("Connected:", connection);
    })

    .on("error", function () {
      subscribe();
    });
};

export default subscribe;
