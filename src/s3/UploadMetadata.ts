import * as BuildMetadata from "../utils/BuildMetadata";
import dotenv from "dotenv";
import path from "path";
import s3 from "../config/s3";
import writeFile from "../utils/writeFile";
dotenv.config();
const bucketName = process.env.AWS_BUCKET_NAME;

const UploadStadiumMetadata = async (
  id: string | number,
  type: string | number
): Promise<void> => {
  try {
    const metadata = BuildMetadata.BuildStadiumMetadata(id, type);

    const filePath = `${path.resolve("./")}/files/stadiums/${id}.json`;
    writeFile(filePath, metadata);

    const Object = {
      Bucket: bucketName,
      Key: `${id}.json`,
      Body: JSON.stringify(metadata),
      ContentType: "application/json",
      Metadata: {
        "Content-Type": "application/json",
      },
    };

    await s3.putObject(Object);

    console.log(`Metadata of stadium ${id} uploaded.`);

    return;
  } catch {
    return;
  }
};

export { UploadStadiumMetadata };
