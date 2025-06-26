/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-06 17:58:45
 * @lastEditors: fengli
 * @lastEditTime:
 */
// src/components/Layout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "./Layout.module.scss";
import { useEffect, useState } from "react";
import routes from "../router.config.tsx";
import Mode from "../components/mode/index.tsx";
import logo from "../assets/logo.png?w=100;200&format=webp;png&quality=80&as=picture";
import RouterSearch from "./RouterSearch/index.tsx";
import { debounce } from "lodash";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";

enum screen_size {
  phone = 0,
  pad = 1,
  desktop = 2,
  superscreen = 3,
}
const getLevel = () => {
  const width = window.innerWidth;
  if (width <= 576) return screen_size.phone;
  if (width > 576 && width <= 768) return screen_size.pad;
  if (width > 768 && width <= 992) return screen_size.desktop;
  return screen_size.superscreen;
};
const useMedia = () => {
  const [size, setSize] = useState<number>(getLevel());
  const [showSecondMenu, setShoSecondMenu] = useState<boolean>(false);
  useEffect(() => {
    // 监听屏幕尺寸变化
    const handleResize = () => {
      setSize(getLevel());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  const toggleSecondMenu = debounce(() => {
    setShoSecondMenu((pre) => !pre);
  }, 50);
  return [size, showSecondMenu, toggleSecondMenu];
};

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTop, setActiveTop] = useState("");
  const [size, showSecondMeanu, toggleSecondMenu] = useMedia();

  useEffect(() => {
    const top = routes.find((r) => location.pathname.startsWith(r.path));
    if (top) setActiveTop(top.key);
  }, [location.pathname]);

  console.log("---logo--", logo);
  const topNav = (
    <>
      {routes.map((r) => {
        return (
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
        );
      })}
    </>
  );
  const sideNav = (
    <>
      {routes
        .find((r) => r.key === activeTop)
        ?.children?.map((child) => {
          return (
            <div
              key={child.path}
              className={`${style.sideItem} ${
                location.pathname === child.path ? style.active : ""
              }`}
              onClick={() => navigate(child.path)}
            >
              {child.name}
            </div>
          );
        })}
    </>
  );
  return (
    <>
      <header className={style.header}>
        <span className={style.title}>
          {/* 媒体查询，小屏幕用汉堡控制二级菜单 */}
          {size == screen_size.phone ? (
            <span onClick={toggleSecondMenu}>
              <svg width={20} height={20} viewBox="0 0 20 20">
                <path d="M3.25 4.167h13.5a.75.75 0 0 1 0 1.5H3.25a.75.75 0 0 1 0-1.5M3.25 9.25h13.5a.75.75 0 0 1 0 1.5H3.25a.75.75 0 0 1 0-1.5M16.75 14.333H3.25a.75.75 0 0 0 0 1.5h13.5a.75.75 0 0 0 0-1.5"></path>
              </svg>
            </span>
          ) : null}
          <a onClick={() => navigate("/")}>
            {/*   <img src={logo} draggable="false" alt="logo" /> */}
            <picture>
              {Object.values(logo.sources).map((source) => (
                <source key={source.srcset} {...source} />
              ))}
              <img
                src={logo.img.src}
                width={logo.img.width}
                height={logo.img.height}
                alt="网站 Logo"
                loading="eager"
              />
            </picture>

            <span className={style.name}>InterestingWeb</span>
          </a>
        </span>
        <div className={style.search}>
          <RouterSearch />
        </div>
        <nav className={style.firstNav}>
          <span>
            <a
              href="https://github.com/fenglier/interestingWeb"
              className={style.gitHub}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </g>
              </svg>
            </a>
          </span>
          {topNav}
          {/* 夜间模式和白日模式 */}
          <div className={style.default}>
            <Mode />
          </div>
        </nav>
      </header>
      {/* 如果平面尺寸过小，采用汉堡包菜单控制二级菜单。此时二级菜单的position为：absolute */}
      <div
        className={style.sidebar}
        style={
          size == screen_size.phone
            ? {
                boxShadow: "var(--shadow-lg)",
                zIndex: 999,
                transform: `translateX(${showSecondMeanu ? 0 : -100}%)`,
                opacity: `${showSecondMeanu ? 1 : 0}`,
                transition: "transform 0.3s ease, opacity 0.3s ease",
              }
            : { position: "fixed" }
        }
      >
        {sideNav}
      </div>
      {/* 遮罩 */}
      {showSecondMeanu ? (
        <div
          onClick={toggleSecondMenu}
          style={{
            position: "fixed",
            inset: 0,
            background: " rgba(0, 0, 0, 0.4)",
            zIndex: 10,
            cursor: "pointer",
          }}
        ></div>
      ) : null}
      <main
        className={style.main}
        style={
          size == screen_size.phone
            ? { marginLeft: "0rem" }
            : { marginLeft: "10rem" }
        }
      >
        <div className={style.route}>
          <Outlet /> {/* 渲染匹配到的子路由 */}
        </div>
      </main>

      <footer style={{ display: "flex", justifyContent: "center" }}>
        © 2025 莉莉娅的网站
      </footer>
    </>
  );
};

export default Layout;
