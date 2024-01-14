/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const quotes = require("./src/assets/Quotes.js");

const buildDir = path.join(__dirname, "build");

const allPath = path.join(buildDir, "all");
const allIndexPath = path.join(allPath, "index.html");
const newAllPath = path.join(buildDir, "all.html");

fs.renameSync(allIndexPath, newAllPath);
fs.rmdirSync(allPath, { recursive: true });

quotes.forEach((quote) => {
  const id = quote.id.toString();
  const quotePath = path.join(buildDir, id);
  const indexPath = path.join(quotePath, "index.html");
  const newFilePath = path.join(buildDir, `${id}.html`);

  fs.renameSync(indexPath, newFilePath);
  fs.rmdirSync(quotePath, { recursive: true });
});

console.log("Post-build processing completed.");
