const Quotes = require("./src/assets/Quotes.js");
const fs = require("fs");
const path = require("path");

// Function to format date
const formatDate = (date) => {
  return date.replace(/\?/g, "01"); // Replace unknown parts with '01'
};

// Function to create sitemap content
const createSitemapContent = (quotes) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add the main site
  xmlContent += `   <url>\n      <loc>https://filosofiskaeleonora.se</loc>\n      <lastmod>${currentDate}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;

  // Add the /all page
  xmlContent += `   <url>\n      <loc>https://filosofiskaeleonora.se/all</loc>\n      <lastmod>${currentDate}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;

  // Add each quote
  quotes.forEach((quote) => {
    const lastmod = quote.date.includes("?")
      ? currentDate
      : formatDate(quote.date);
    xmlContent += `   <url>\n      <loc>https://filosofiskaeleonora.se/${quote.id}</loc>\n      <lastmod>${lastmod}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;
  });

  xmlContent += "</urlset>";
  return xmlContent;
};

// Generate sitemap content
const sitemapContent = createSitemapContent(Quotes);

// Write to sitemap.xml in the public directory
const publicDir = path.join("public"); // Adjust the path as needed
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapContent);

console.log("Sitemap generated successfully.");
