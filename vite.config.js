/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import Quotes from "./src/assets/Quotes";
import fs from 'fs';
import { minify } from "html-minifier-terser";

// Helper function to create quote HTML - dynamically gets asset paths
const createQuoteHtml = (quote, cssPath, jsPath) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/pusheen-cat.png" />
    <meta property="og:image" content="/pusheen-cat.png" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffefc4" />
    <meta
      name="description"
      content="Filosofiska Eleonora, citat från Ida Eleonora ❤️"
    />
    <link rel="apple-touch-icon" href="/pusheen-cat.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>Quote #${quote.id} | Filosofiskaeleonora.se</title>
    <script type="module" crossorigin src="${jsPath}"></script>
    <link rel="stylesheet" crossorigin href="${cssPath}">
    <meta property="og:title" content="Quote #${quote.id} | Filosofiskaeleonora.se" />
    <meta property="og:description" content="${quote.quote}" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      <div class="app">
        <div>
          <div class="home col-md-5 mx-auto">
            <h1>
              <strong>
                <em>${quote.quote}</em>
              </strong>
            </h1>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

// Helper function to create the all quotes HTML
const createAllQuotesHtml = (cssPath, jsPath) => {
  const quotesHtml = Quotes.map(quote => 
    `<div class="col mb-4">
      <div class="card h-100 bg-light">
        <div class="card-body">
          <p class="card-text"><strong><em>${quote.quote}</em></strong></p>
          <p class="card-text text-muted small">${quote.date}</p>
        </div>
      </div>
    </div>`
  ).join('');

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/pusheen-cat.png" />
    <meta property="og:image" content="/pusheen-cat.png" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffefc4" />
    <meta
      name="description"
      content="Filosofiska Eleonora, citat från Ida Eleonora ❤️"
    />
    <link rel="apple-touch-icon" href="/pusheen-cat.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>All Quotes | Filosofiskaeleonora.se</title>
    <script type="module" crossorigin src="${jsPath}"></script>
    <link rel="stylesheet" crossorigin href="${cssPath}">
    <meta property="og:title" content="All Quotes | Filosofiskaeleonora.se" />
    <meta property="og:description" content="All quotes from Filosofiska Eleonora" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      <div class="app">
        <div>
          <div class="container py-4">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              ${quotesHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

// Helper function to minify HTML
const minifyHtml = (html) => {
  return minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  });
};

// Function to find asset paths in the build directory
const findAssetPaths = (buildDir) => {
  try {
    const assetsDir = path.join(buildDir, 'assets');
    const files = fs.readdirSync(assetsDir);
    
    const cssFile = files.find(file => file.endsWith('.css'));
    const jsFile = files.find(file => file.endsWith('.js'));
    
    return {
      cssPath: cssFile ? `/assets/${cssFile}` : '',
      jsPath: jsFile ? `/assets/${jsFile}` : ''
    };
  } catch (err) {
    console.error('Error finding asset paths:', err);
    return { cssPath: '', jsPath: '' };
  }
};

export default defineConfig(({ command, mode }) => {
  // Check if we're running in test mode
  const isTest = mode === 'test';
  
  // Only include the pre-rendering plugin if not in test mode
  const plugins = [react()];
  
  if (!isTest) {
    plugins.push({
      name: 'generate-prerendered-files',
      closeBundle: {
        sequential: true,
        order: 'post',
        handler: async () => {
          try {
            const buildDir = path.resolve(__dirname, 'build');
            const { cssPath, jsPath } = findAssetPaths(buildDir);
            
            console.log(`Found asset paths - CSS: ${cssPath}, JS: ${jsPath}`);
            
            // Create home page with random quote
            const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)];
            const homeContent = createQuoteHtml(randomQuote, cssPath, jsPath);
            const minifiedHome = await minifyHtml(homeContent);
            fs.writeFileSync(path.join(buildDir, 'index.html'), minifiedHome);
            console.log(`Created pre-rendered home page with quote #${randomQuote.id}`);
            
            // Create all quotes page
            const allContent = createAllQuotesHtml(cssPath, jsPath);
            const minifiedAll = await minifyHtml(allContent);
            fs.writeFileSync(path.join(buildDir, 'all.html'), minifiedAll);
            console.log(`Created pre-rendered all.html`);
            
            // Create individual quote pages
            for (const quote of Quotes) {
              const content = createQuoteHtml(quote, cssPath, jsPath);
              const minified = await minifyHtml(content);
              fs.writeFileSync(path.join(buildDir, `${quote.id}.html`), minified);
              console.log(`Created pre-rendered ${quote.id}.html with quote content`);
            }
          } catch (err) {
            console.error('Error in prerendering plugin:', err);
          }
        }
      }
    });
  }

  return {
    build: {
      outDir: "build",
      emptyOutDir: true
    },
    plugins,
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.js'],
      environmentOptions: {
        jsdom: {
          // Silence React key warning messages during tests
          logLevel: 'silent',
        }
      },
      onConsoleLog(log) {
        // Filter out React key warning messages
        if (log.includes('Warning: Each child in a list should have a unique "key" prop')) {
          return false;
        }
        return true;
      }
    }
  };
});
