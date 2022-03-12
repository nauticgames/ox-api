import fs from "fs";

export default function readFile(path) {
  try {
    const result = fs.readFileSync(path);

    return result;
  } catch {
    return null;
  }
}
