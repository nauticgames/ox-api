import fs from "fs";

export default function writeFile(path, object) {
  object = JSON.stringify(object);

  return fs.writeFileSync(path, object);
}
