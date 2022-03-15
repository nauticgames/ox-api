import Stadium, { IStadium } from "../db/models/Stadium";
import ResponseHandler from "../utils/ResponseHandler";

interface IServiceResponse {
  code?: number;
  data?: object;
  message?: string;
}

export const NewStadium = async (metadata: IStadium) => {
  try {
    const stadium = new Stadium(metadata);

    await stadium.save();
  } catch {
    throw new Error();
  }
};

export const FindStadium = async (id: number): Promise<IServiceResponse> => {
  try {
    const stadium = await Stadium.findOne({ itemId: id });

    if (!stadium) {
      return ResponseHandler.AssetNotFound;
    }

    return {
      code: 200,
      data: stadium,
    };
  } catch {
    return null;
  }
};
