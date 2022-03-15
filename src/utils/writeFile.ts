import fs from "fs";

export default function writeFile(path, object) {
  try {
    return fs.writeFileSync(path, JSON.stringify(object));
  } catch {
    return null;
  }
}
