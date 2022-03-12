import Stadium, { IStadium } from "../db/models/Stadium";

export const NewStadium = async (metadata: IStadium) => {
  try {
    const stadium = new Stadium(metadata);

    await stadium.save();
  } catch {
    throw new Error();
  }
};

export const FindStadium = async (id: number) => {
  try {
    const stadium = await Stadium.findOne({ itemId: id });

    return stadium;
  } catch {
    return null;
  }
};
