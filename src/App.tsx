/*
 * @Author: fengli
 * @Description: 
 * @Date: 2025-05-07 13:02:35
 * @lastEditors: fengli
 * @lastEditTime: 
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout.tsx';
import  routes  from './router.config.tsx';

export default function App2() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard/overview" />} />
        {routes.flatMap(r =>
          r.children?.map(child => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))
        )}
      </Route>
    </Routes>
  );
}

