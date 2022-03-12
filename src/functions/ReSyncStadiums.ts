import StadiumsABI from "../ABI/StadiumsABI";
import server from "../config/server";
import { httpsInstance } from "../config/web3";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { UploadStadiumMetadata } from "../s3/UploadMetadata";
import { FindStadium } from "../services/Stadiums";
import ResponseHandler from "../utils/ResponseHandler";

interface IReSyncStadiumsParams {
  bucketName?: string;
}

const contract = new httpsInstance.eth.Contract(
  StadiumsABI,
  server.web3.stadiumsContract
);

const ReSyncStadiums = async (
  params: IReSyncStadiumsParams
): Promise<ServiceResponse> => {
  const { bucketName } = params;

  const totalSupply = Number(await contract.methods.totalSupply().call());

  const unSyncedTokens = [];

  for (let i = 1; i <= totalSupply; i++) {
    try {
      const stadium = await FindStadium(i);

      if (!stadium) unSyncedTokens.push(i);
    } catch {
      continue;
    }
  }

  if (unSyncedTokens.length === 0) {
    return ResponseHandler.NothingToResync;
  }

  for (let i = 0; i < unSyncedTokens.length; i++) {
    try {
      const id = unSyncedTokens[i];
      const type = await contract.methods.getStadiumType(id).call();

      await UploadStadiumMetadata({
        id,
        type,
        bucket: bucketName,
      });
    } catch {
      continue;
    }
  }

  return {
    code: 200,
    message: "Stadiums synced successfully",
  };
};

export default ReSyncStadiums;
