import fs from "fs";

export default function readFile(path) {
  try {
    const result = fs.readFileSync(path, { encoding: "utf8" });

    return result;
  } catch {
    return null;
  }
}
