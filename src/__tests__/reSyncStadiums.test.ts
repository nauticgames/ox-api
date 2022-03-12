import StadiumsABI from "../ABI/StadiumsABI";
import server from "../config/server";
import { httpsInstance } from "../config/web3";
import ReSyncStadiums from "../functions/ReSyncStadiums";

describe("Re sync stadiums", () => {
  let contract;

  beforeAll(async () => {
    contract = new httpsInstance.eth.Contract(
      StadiumsABI,
      server.web3.stadiumsContract
    );
  });

  test("Resync metadatas and get 200 code", async () => {
    const response = await ReSyncStadiums({ contract, bucketName: "test" });

    expect(response.code).toEqual(200);
  });
});
