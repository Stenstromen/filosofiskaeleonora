const Quotes = require("./src/assets/Quotes.js");
const fs = require("fs");
const path = require("path");

const createRedirectsContent = (quotes) => {
  let redirectsContent = "";

  redirectsContent += "/all/    /all    301!\n";
  quotes.forEach((quote) => {
    redirectsContent += `/${quote.id}/    /${quote.id}    301!\n`;
  });

  redirectsContent += "/*    /:splat    301!\n";

  return redirectsContent;
};

const redirectsContent = createRedirectsContent(Quotes);

const rootDir = path.join(".");
fs.writeFileSync(path.join(rootDir, "_redirects"), redirectsContent);

console.log("Redirects file generated successfully.");
