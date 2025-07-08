/* eslint-disable no-undef */
const Quotes = require("./src/assets/Quotes.js");
const fs = require("fs");
const path = require("path");

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

const publicDir = path.join("public");
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapContent);

console.log("Sitemap generated successfully.");
