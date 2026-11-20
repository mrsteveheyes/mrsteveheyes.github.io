// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://steveheyes.co.uk',
  output: 'static',
  // Keep whitespace as authored; compression joins "Keybase /" to the next link.
  compressHTML: false,
  markdown: {
    // Keep quotes and apostrophes exactly as written in the Markdown.
    smartypants: false,
  },
});
