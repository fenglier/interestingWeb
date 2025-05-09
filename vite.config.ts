/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-04-24 11:03:44
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ghPages } from "vite-plugin-gh-pages";
import mdx from "@mdx-js/rollup";
import * as shiki from "shiki";
import {
  BundledLanguage,
  BundledTheme,
  codeToHtml,
  createHighlighter,
} from "shiki/bundle/web";

export default defineConfig(async () => {
  const highlighter = await createHighlighter({
    langs: ["html", "css", "jsx", "tsx"],
    themes: ["nord"],
  });
  const rehypeShiki = (await import("rehype-shiki")).default;
  return {
    plugins: [
      react(),
      ghPages(),
      mdx({
        remarkPlugins: [],
        rehypePlugins: [[rehypeShiki, { highlighter }]],
      }),
    ],
    base: "/interestingWeb", // 非常重要！
  };
});
