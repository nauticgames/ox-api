import * as BuildMetadata from "../utils/BuildMetadata";
import dotenv from "dotenv";
import path from "path";
import s3 from "../config/s3";
import writeFile from "../utils/writeFile";
import server from "../config/server";
import { NewStadium } from "../services/Stadiums";

dotenv.config();

interface IUploadStadiumMetadataParams {
  id: string | number;
  type: string | number;
  bucket?: string;
}

const UploadStadiumMetadata = async (
  params: IUploadStadiumMetadataParams
): Promise<void> => {
  const { id, type, bucket } = params;

  try {
    const metadata = BuildMetadata.BuildStadiumMetadata(id, type);

    await NewStadium(metadata);

    const Object = {
      Bucket: bucket || server.aws.stadiumsBucket,
      Key: `${id}.json`,
      Body: JSON.stringify(metadata),
      ContentType: "application/json",
      Metadata: {
        "Content-Type": "application/json",
      },
    };

    await s3.putObject(Object);

    return;
  } catch {
    throw new Error();
  }
};

export { UploadStadiumMetadata };
