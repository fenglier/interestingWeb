/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-07 13:02:35
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout.tsx";
import routes from "./router.config.tsx";
import { Suspense } from "react";

export default function App2() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home/welcome" />} />
        {routes.flatMap((r) =>
          r.children?.map((child) => (
            <Route
              key={child.path}
              path={child.path}
              element={
                <Suspense fallback={<div>页面加载中...</div>}>
                  {child.element}
                </Suspense>
              }
            />
          ))
        )}
      </Route>
    </Routes>
  );
}
