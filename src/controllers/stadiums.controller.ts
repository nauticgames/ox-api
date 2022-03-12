import path from "path";
import { httpsInstance } from "../config/web3";
import StadiumsABI from "../ABI/StadiumsABI";
import server from "../config/server";
import { Request, Response } from "express";
import readFile from "../utils/readFile";
import ResponseHandler from "../utils/ResponseHandler";
import { BuildStadiumMetadata } from "../utils/BuildMetadata";
import writeFile from "../utils/writeFile";
import { UploadStadiumMetadata } from "../s3/UploadMetadata";

const contract = new httpsInstance.eth.Contract(
  StadiumsABI,
  server.web3.stadiumsContract
);

export const getMetadata = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const filePath = `${path.resolve("./")}/files/stadiums/${id}.json`;
    const metadata = readFile(filePath);

    if (!metadata) {
      return res.status(404).json(ResponseHandler.AssetNotFound);
    }

    return res.status(200).json(metadata);
  } catch {
    return res.status(500).json(ResponseHandler.NetworkError);
  }
};

export const reSyncMetadata = async (req: Request, res: Response) => {
  try {
    const supply = await contract.methods.totalSupply().call();

    const totalSupply = Number(supply);

    const unSyncedTokens = [];

    for (let i = 1; i <= totalSupply; i++) {
      try {
        const filePath = `${path.resolve("./")}/files/stadiums/${i}.json`;
        const synced = readFile(filePath);

        if (synced) continue;
      } catch {
        unSyncedTokens.push(i);
      }
    }

    if (unSyncedTokens.length === 0) {
      return res.status(200).json(ResponseHandler.NothingToResync);
    }

    for (let i = 0; i < unSyncedTokens.length; i++) {
      try {
        const id = unSyncedTokens[i];
        const type = await contract.methods.getStadiumType(id).call();

        const metadata = BuildStadiumMetadata(id, type);

        const filePath = `${path.resolve("./")}/files/stadiums/${id}.json`;

        writeFile(filePath, metadata);

        await UploadStadiumMetadata(id, type);
      } catch {
        continue;
      }
    }

    return res.status(200).json(ResponseHandler.AssetsSynced);
  } catch {
    return res.status(500).json(ResponseHandler.NetworkError);
  }
};
