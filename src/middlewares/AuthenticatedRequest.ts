import { Request, Response, NextFunction } from "express";
import server from "../config/server";
import ResponseHandler from "../utils/ResponseHandler";

interface ICustomRequest extends Request {
  headers: {
    master_key: string;
  };
}

const AuthenticatedRequest = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { master_key } = req.headers;

  if (!master_key || server.master !== master_key) {
    return res.status(401).json(ResponseHandler.Unauthorized);
  } else {
    next();
  }
};

export default AuthenticatedRequest;
