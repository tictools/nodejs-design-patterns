import path from "node:path";
import { fileURLToPath } from "node:url";

const getAssetPath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, "../assets/", `${filename}.txt`);
};

export default getAssetPath;
