import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Quotes from './src/assets/Quotes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildDir = path.join(__dirname, "build");

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
  console.error('Build directory does not exist!');
  process.exit(1);
}

// Generate sitemap.xml
const formatDate = (date) => {
  return date.replace(/\?/g, "01");
};

const createSitemapContent = (quotes) => {
  const currentDate = new Date().toISOString().split("T")[0];
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  xmlContent += `   <url>\n      <loc>https://filosofiskaeleonora.se</loc>\n      <lastmod>${currentDate}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;

  xmlContent += `   <url>\n      <loc>https://filosofiskaeleonora.se/all</loc>\n      <lastmod>${currentDate}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;

  quotes.forEach((quote) => {
    const lastmod = quote.date.includes("?")
      ? currentDate
      : formatDate(quote.date);
    xmlContent += `   <url>\n      <loc>https://filosofiskaeleonora.se/${quote.id}</loc>\n      <lastmod>${lastmod}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;
  });

  xmlContent += "</urlset>";
  return xmlContent;
};

const sitemapContent = createSitemapContent(Quotes);
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemapContent);
console.log("Sitemap generated successfully.");

console.log("Post-build processing completed.");