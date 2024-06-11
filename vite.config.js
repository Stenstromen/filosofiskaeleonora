/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { htmlPrerender } from "vite-plugin-html-prerender";
//import routes from "./routes.js";
import Quotes from "./src/assets/Quotes";
import path from "path";
import { minify } from "html-minifier-terser";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      htmlPrerender({
        staticDir: path.resolve(__dirname, "build"),
        fallbackDir: path.resolve(__dirname, "build"),
        routes: ["/", "/all"].concat(Quotes.map((route) => `/${route.id}`)),
        minify: (html) =>
          minify(html, {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true,
            html5: true,
            useShortDoctype: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeScriptTypeAttributes: true,
            removeAttributeQuotes: true,
            removeOptionalTags: true,
            removeEmptyElements: false,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
          }),
      }),
    ],
  };
});
