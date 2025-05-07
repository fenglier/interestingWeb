/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-06 17:58:45
 * @lastEditors: fengli
 * @lastEditTime:
 */
// src/components/Layout.tsx
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import style from "./Layout.module.scss";
import { useEffect, useState } from "react";
import routes from "../router.config.tsx";
import Mode from "../components/mode/index.tsx";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTop, setActiveTop] = useState("");

  useEffect(() => {
    const top = routes.find((r) => location.pathname.startsWith(r.path));
    if (top) setActiveTop(top.key);
  }, [location.pathname]);

  const topNav = (
    <>
      {routes.map((r) => (
        <div
          key={r.key}
          className={`${style.default} ${
            r.key === activeTop ? style.active : ""
          }`}
          onClick={() => {
            setActiveTop(r.key);
            navigate(r.children?.[0]?.path || r.path);
          }}
        >
          {r.name}
        </div>
      ))}
    </>
  );
  const sideNav = (
    <>
      {routes
        .find((r) => r.key === activeTop)
        ?.children?.map((child) => (
          <div
            key={child.path}
            className={`${style.sideItem} ${location.pathname === child.path ? style.active : ""}`}
            onClick={() => navigate(child.path)}
          >
            {child.name}
          </div>
        ))}
    </>
  );
  return (
    <>
      <header className={style.header}>
        <h2 className={style.title}>InterestingWeb</h2>
        <div className={style.ocuppy}></div>
        <nav className={style.firstNav}>
          {/* TODO */}
          <span>search</span>
          {topNav}
          {/* 夜间模式和白日模式 */}
          <Mode />
        </nav>
      </header>
      <div className={style.sidebar}>{sideNav}</div>
      <main className={style.main}>
        <div className={style.route}>
          <Outlet /> {/* 渲染匹配到的子路由 */}
        </div>
      </main>

      <footer>© 2025 我的网站</footer>
    </>
  );
};

export default Layout;
