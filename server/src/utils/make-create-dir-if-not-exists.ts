import { writeFile } from "fs/promises";
import { existsSync } from "fs";

export default function makeCreateDirIfNotExists({
  filePath,
}: {
  filePath: string;
}) {
  return async function createDirIfNotExists() {
    try {
      if (!existsSync(filePath)) {
        await writeFile(filePath, "[]", { encoding: "utf8" });
      }
    } catch (error) {
      console.error(error);
    }
  };
}
