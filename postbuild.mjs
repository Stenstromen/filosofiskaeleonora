import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import quotes from './src/assets/Quotes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildDir = path.join(__dirname, "build");

const allPath = path.join(buildDir, "all");
const allIndexPath = path.join(allPath, "index.html");
const newAllPath = path.join(buildDir, "all.html");

fs.renameSync(allIndexPath, newAllPath);
fs.rmSync(allPath, { recursive: true });

quotes.forEach((quote) => {
  const id = quote.id.toString();
  const quotePath = path.join(buildDir, id);
  const indexPath = path.join(quotePath, "index.html");
  const newFilePath = path.join(buildDir, `${id}.html`);

  fs.renameSync(indexPath, newFilePath);
  fs.rmSync(quotePath, { recursive: true });
});

console.log("Post-build processing completed.");