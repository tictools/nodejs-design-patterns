import getAssetPath from "../../../utils/getAssetPath.mjs";
import FindRegex from "./FindRegex.mjs";

const regexFinder = new FindRegex(/lorem/i);

regexFinder
  .addFile(getAssetPath("fileA"))
  .addFile(getAssetPath("fileB"))
  .find()
  .on("start", (files) =>
    console.log(`Start emitted :: finding match in ${files.length} files`)
  )
  .on("readFile", (file) => console.log(`ReadFile emitted :: ${file}`))
  .on("found", ({ element, file }) =>
    console.log(`Found emitted :: element [${element}] in file ${file}`)
  )
  .on("error", (error) => console.error(`Error emitted :: ${error.message}`));
