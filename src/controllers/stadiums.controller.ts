import { Request, Response } from "express";
import ResponseHandler from "../utils/ResponseHandler";
import ReSyncStadiums from "../functions/ReSyncStadiums";
import { FindStadium } from "../services/Stadiums";
import server from "../config/server";

export const getMetadata = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await FindStadium(Number(id));

    return res.status(response.code).json(response);
  } catch {
    return res.status(500).json(ResponseHandler.NetworkError);
  }
};

export const reSyncMetadata = async (req: Request, res: Response) => {
  try {
    const response = await ReSyncStadiums({
      bucketName: server.aws.stadiumsBucket,
    });

    return res.status(response.code).json(response);
  } catch {
    return res.status(500).json(ResponseHandler.NetworkError);
  }
};
