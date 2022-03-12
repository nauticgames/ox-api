import { Schema, model } from "mongoose";

export interface IStadium {
  itemId: number;
  name: string;
  description: string;
  external_url: string;
  image: string;
  attributes: [
    {
      trait_type: string;
      value: string;
    }
  ];
}

const StadiumSchema = new Schema<IStadium>({
  itemId: { type: Number, required: true, max: 15000, min: 1 },
  name: { type: String, required: true },
  description: { type: String, required: true },
  external_url: { type: String, required: true },
  image: { type: String, required: true },
  attributes: [
    {
      trait_type: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

export default model("Stadium", StadiumSchema);
