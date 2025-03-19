import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildDir = path.join(__dirname, "build");

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
  console.error('Build directory does not exist!');
  process.exit(1);
}

console.log("Post-build processing completed.");