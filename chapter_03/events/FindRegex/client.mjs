import getAssetPath from '../../utils/getAssetPath.mjs'
import FindRegex from './FindRegex.mjs'

const regexFinder = new FindRegex(/lorem/i)

regexFinder
  .addFile(getAssetPath('fileA'))
  .addFile(getAssetPath('fileB'))
  .find()
  .on('error', error => console.error(`Error emitted :: ${error.message}`))
  .on('readFile', file => console.log(`ReadFile emitted :: ${file}`))
  .on('found', ({ element, file }) => console.log(`Found emitted :: element [${element}] in file ${file}`))
