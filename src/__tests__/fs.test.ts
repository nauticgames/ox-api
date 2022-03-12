import path from "path";
import writeFile from "../utils/writeFile";
import readFile from "../utils/readFile";

describe("Read and write files", () => {
  const testPath = `${path.resolve("./")}/files/stadiums/18000.json`;

  test("Write and read file", () => {
    const testObj = {
      name: "test",
      id: "18000",
    };

    writeFile(testPath, testObj);

    const response = JSON.parse(readFile(testPath));

    expect(response).not.toBeNull();

    expect(response.name).toEqual(testObj.name);
  });
});
