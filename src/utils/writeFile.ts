import fs from "fs";

export default function writeFile(path, object) {
  return fs.writeFileSync(path, JSON.stringify(object));
}
