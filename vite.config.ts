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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ghPages()],
  base: "/", // 非常重要！
});
