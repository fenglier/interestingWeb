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
import remarkGfm from "remark-gfm"; // ✅ 引入 GFM 支持

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
        remarkPlugins: [remarkGfm], // ✅ 加入 GFM 插件。支持 GitHub 风格 Markdown 表格语法（GFM）的插件 remark-gfm
        rehypePlugins: [[rehypeShiki, { highlighter }]],
      }),
    ],
    base: "/interestingWeb", // 非常重要！
  };
});
